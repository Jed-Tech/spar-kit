/**
 * Config-driven repo bootstrap: apply install-root/ to the consumer repo with
 * per-entry preserve/update rules. Returns `warnings` for install-report.
 */
import {
  access,
  copyFile,
  cp,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const SPAR_BLOCK_RE =
  /<!--\s*spar-kit:start\s*-->[\s\S]*?<!--\s*spar-kit:end\s*-->/;
const SPAR_PAIR_RE_G =
  /<!--\s*spar-kit:start\s*-->[\s\S]*?<!--\s*spar-kit:end\s*-->/g;

function hasAnySparMarker(text) {
  return /<!--\s*spar-kit:(?:start|end)\s*-->/.test(text);
}

function stripAllSparPairs(text) {
  return text.replace(SPAR_PAIR_RE_G, "");
}

function extractTitleBeforeSparBlock(payloadText) {
  const i = payloadText.indexOf("<!-- spar-kit:start -->");
  if (i < 0) return "";
  return payloadText.slice(0, i).replace(/\s+$/m, "");
}

function extractManagedBlock(payloadText) {
  const m = payloadText.match(SPAR_BLOCK_RE);
  return m ? m[0] : payloadText.trim();
}

function composeManagedFileAfterStrip(payloadText, sparBlock, stripped) {
  let rest = stripped.replace(/^\uFEFF/, "");
  const title = extractTitleBeforeSparBlock(payloadText);
  if (title) {
    const t = title.trimEnd();
    const rs = rest.trimStart();
    if (rs.startsWith(t)) {
      rest = rs.slice(t.length).replace(/^\s+/, "");
    }
  }
  if (!rest.trim()) {
    return payloadText.replace(SPAR_BLOCK_RE, sparBlock);
  }
  if (title) {
    const tt = title.trimEnd();
    return `${tt}\n\n${sparBlock}\n\n${rest.trimStart()}`
      .replace(/\n{3,}/g, "\n\n")
      .trimEnd();
  }
  return `${sparBlock}\n\n${rest.trimStart()}`.trimEnd();
}

export async function pathExists(p) {
  try {
    await access(p, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readTargetConfig(payloadRoot, name) {
  const configPath = join(payloadRoot, "targets", `${name}.json`);
  const raw = await readFile(configPath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed.entries)) {
    throw new Error(`Invalid target config ${name}.json: missing entries array`);
  }
  return parsed.entries;
}

async function applyManagedBlockFile(payloadRoot, targetDir, entry, warnings) {
  const payloadPath = join(payloadRoot, entry.from);
  const targetPath = join(targetDir, entry.to);
  const payloadText = await readFile(payloadPath, "utf8");
  const sparBlock = extractManagedBlock(payloadText);

  if (!(await pathExists(targetPath))) {
    await mkdir(dirname(targetPath), { recursive: true });
    await writeFile(targetPath, payloadText, "utf8");
    return;
  }

  const existing = await readFile(targetPath, "utf8");
  if (!hasAnySparMarker(existing)) {
    await writeFile(targetPath, `${sparBlock}\n\n${existing}`, "utf8");
    return;
  }

  const stripped = stripAllSparPairs(existing);
  if (hasAnySparMarker(stripped)) {
    warnings.push(
      `${entry.to} contains malformed SPAR markers; file left unchanged. Compare with install-root/${entry.from} and fix marker comments.`,
    );
    return;
  }

  const composed = composeManagedFileAfterStrip(payloadText, sparBlock, stripped);
  await writeFile(
    targetPath,
    composed.endsWith("\n") ? composed : `${composed}\n`,
    "utf8",
  );
}

async function applySeedIfMissing(payloadRoot, targetDir, entry, warnings) {
  const payloadPath = join(payloadRoot, entry.from);
  const targetPath = join(targetDir, entry.to);
  if (await pathExists(targetPath)) {
    warnings.push(`Preserved existing ${entry.to.replace(/\\/g, "/")} (not overwritten).`);
    return;
  }
  await mkdir(dirname(targetPath), { recursive: true });
  await copyFile(payloadPath, targetPath);
}

async function applyReplace(payloadRoot, targetDir, entry) {
  const payloadPath = join(payloadRoot, entry.from);
  const targetPath = join(targetDir, entry.to);
  await mkdir(dirname(targetPath), { recursive: true });
  await copyFile(payloadPath, targetPath);
}

async function applyReplaceManagedChildren(payloadRoot, targetDir, entry) {
  const payloadPath = join(payloadRoot, entry.from);
  const targetPath = join(targetDir, entry.to);
  if (!(await pathExists(payloadPath))) {
    return;
  }
  await mkdir(targetPath, { recursive: true });
  const managedChildren = await readdir(payloadPath, { withFileTypes: true });
  for (const child of managedChildren) {
    const from = join(payloadPath, child.name);
    const to = join(targetPath, child.name);
    if (child.isDirectory()) {
      await cp(from, to, { recursive: true, force: true });
    } else if (child.isFile()) {
      await mkdir(dirname(to), { recursive: true });
      await copyFile(from, to);
    }
  }
}

async function applyEntry(payloadRoot, targetDir, entry, warnings) {
  switch (entry.policy) {
    case "managed_block":
      return applyManagedBlockFile(payloadRoot, targetDir, entry, warnings);
    case "seed_if_missing":
      return applySeedIfMissing(payloadRoot, targetDir, entry, warnings);
    case "replace":
      return applyReplace(payloadRoot, targetDir, entry);
    case "replace_managed_children":
      return applyReplaceManagedChildren(payloadRoot, targetDir, entry);
    default:
      throw new Error(
        `Unsupported install policy ${JSON.stringify(entry.policy)} in ${basename(entry.to)}`,
      );
  }
}

async function applyTargetConfig(payloadRoot, targetDir, name, warnings) {
  const entries = await readTargetConfig(payloadRoot, name);
  for (const entry of entries) {
    await applyEntry(payloadRoot, targetDir, entry, warnings);
  }
}

/**
 * Run config-driven repo bootstrap for a resolved payload root and target directory.
 * `targets` should not include `default`; it is always applied first.
 */
export async function runRepoBootstrap({ payloadRoot, targetDir, targets }) {
  const absTarget = resolve(targetDir);
  if (!(await pathExists(payloadRoot))) {
    throw new Error(
      `spar-kit: install payload not found at ${payloadRoot}. Is the package installed correctly?`,
    );
  }

  const warnings = [];
  await applyTargetConfig(payloadRoot, absTarget, "default", warnings);
  for (const target of targets) {
    await applyTargetConfig(payloadRoot, absTarget, target, warnings);
  }
  return { warnings };
}
