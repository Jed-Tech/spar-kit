/**
 * Beta1 repo bootstrap (repo-bootstrap_spec.md): apply install-root/ to the consumer repo
 * with preserve/update rules. Returns `warnings` for install-report (install-report_spec.md).
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
import { dirname, join, resolve } from "node:path";

/** Matches the SPAR block shipped in install-root/AGENTS.md for idempotent updates. */
const SPAR_AGENTS_BLOCK_RE =
  /<!--\s*spar-kit:start\s*-->[\s\S]*?<!--\s*spar-kit:end\s*-->/;

/** Removes every well-formed start…end pair (non-greedy, global). */
const SPAR_AGENTS_PAIR_RE_G =
  /<!--\s*spar-kit:start\s*-->[\s\S]*?<!--\s*spar-kit:end\s*-->/g;

function hasAnySparMarker(text) {
  return /<!--\s*spar-kit:(?:start|end)\s*-->/.test(text);
}

function stripAllSparPairs(text) {
  return text.replace(SPAR_AGENTS_PAIR_RE_G, "");
}

function extractTitleBeforeSparBlock(payloadAgentsText) {
  const i = payloadAgentsText.indexOf("<!-- spar-kit:start -->");
  if (i < 0) return "";
  return payloadAgentsText.slice(0, i).replace(/\s+$/m, "");
}

/**
 * After all complete SPAR pairs are stripped, rebuild one canonical block + remainder.
 * Empty remainder → same as replacing the block in install-root/AGENTS.md (stable layout).
 */
function composeAgentsAfterStrip(payloadText, sparBlock, stripped) {
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
    return payloadText.replace(SPAR_AGENTS_BLOCK_RE, sparBlock);
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

function extractSparAgentsBlock(payloadAgentsText) {
  const m = payloadAgentsText.match(SPAR_AGENTS_BLOCK_RE);
  return m ? m[0] : payloadAgentsText.trim();
}

/**
 * Create AGENTS.md from payload when missing; otherwise merge SPAR block per repo-bootstrap_spec.
 * Malformed markers (orphan start/end): warn and leave file unchanged (no duplicate SPAR content).
 */
export async function applyAgentsMd(payloadRoot, targetDir, warnings) {
  const payloadPath = join(payloadRoot, "AGENTS.md");
  const targetPath = join(targetDir, "AGENTS.md");
  const payloadText = await readFile(payloadPath, "utf8");
  const sparBlock = extractSparAgentsBlock(payloadText);

  if (!(await pathExists(targetPath))) {
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
      "AGENTS.md contains malformed SPAR markers; file left unchanged. Compare with install-root/AGENTS.md and fix marker comments.",
    );
    return;
  }

  const composed = composeAgentsAfterStrip(payloadText, sparBlock, stripped);
  await writeFile(
    targetPath,
    composed.endsWith("\n") ? composed : `${composed}\n`,
    "utf8",
  );
}

/**
 * Seed justfile only when the target does not already have one.
 */
export async function applyJustfile(payloadRoot, targetDir, warnings) {
  const payloadPath = join(payloadRoot, "justfile");
  const targetPath = join(targetDir, "justfile");
  if (await pathExists(targetPath)) {
    warnings.push(
      "Existing justfile preserved; bundled justfile was not applied.",
    );
    return;
  }
  if (await pathExists(payloadPath)) {
    await copyFile(payloadPath, targetPath);
  }
}

/**
 * SPAR-managed: always write from payload (reinstall may update).
 */
export async function applySparKitVersion(payloadRoot, targetDir) {
  const payloadPath = join(payloadRoot, ".spar-kit", "VERSION");
  const targetDirSpar = join(targetDir, ".spar-kit");
  const targetPath = join(targetDirSpar, "VERSION");
  await mkdir(targetDirSpar, { recursive: true });
  if (!(await pathExists(payloadPath))) {
    return;
  }
  await copyFile(payloadPath, targetPath);
}

/**
 * Machine-local: copy each file from payload only if the destination path is absent.
 */
export async function applySparKitLocalAbsentOnly(payloadRoot, targetDir, warnings) {
  const payloadLocal = join(payloadRoot, ".spar-kit", ".local");
  const targetLocal = join(targetDir, ".spar-kit", ".local");
  if (!(await pathExists(payloadLocal))) {
    return;
  }
  await mkdir(targetLocal, { recursive: true });
  await copyTreeFilesAbsentOnly(payloadLocal, targetLocal, warnings, "");
}

async function copyTreeFilesAbsentOnly(srcRoot, destRoot, warnings, relPrefix) {
  const entries = await readdir(srcRoot, { withFileTypes: true });
  for (const ent of entries) {
    const src = join(srcRoot, ent.name);
    const dest = join(destRoot, ent.name);
    const relPath = relPrefix ? `${relPrefix}/${ent.name}` : ent.name;
    if (ent.isDirectory()) {
      await mkdir(dest, { recursive: true });
      await copyTreeFilesAbsentOnly(src, dest, warnings, relPath);
    } else if (ent.isFile()) {
      if (await pathExists(dest)) {
        const display = relPath.replace(/\\/g, "/");
        warnings.push(
          `Preserved existing .spar-kit/.local/${display} (not overwritten).`,
        );
        continue;
      }
      await mkdir(dirname(dest), { recursive: true });
      await copyFile(src, dest);
    }
  }
}

/**
 * SPAR-managed skill dirs from install-root are replaced; other dirs under .agents/skills/ are left alone.
 */
export async function applyAgentsSkills(payloadRoot, targetDir) {
  const payloadSkills = join(payloadRoot, ".agents", "skills");
  const targetAgents = join(targetDir, ".agents");
  const targetSkills = join(targetAgents, "skills");
  if (!(await pathExists(payloadSkills))) {
    return;
  }
  await mkdir(targetAgents, { recursive: true });
  await mkdir(targetSkills, { recursive: true });

  const managed = await readdir(payloadSkills, { withFileTypes: true });
  for (const ent of managed) {
    if (!ent.isDirectory()) {
      continue;
    }
    const from = join(payloadSkills, ent.name);
    const to = join(targetSkills, ent.name);
    await cp(from, to, { recursive: true, force: true });
  }
}

/**
 * specs/README.md, specs/active/, specs/completed/ — SPAR-managed from payload.
 */
export async function applySpecsTree(payloadRoot, targetDir) {
  const payloadSpecs = join(payloadRoot, "specs");
  const targetSpecs = join(targetDir, "specs");
  if (!(await pathExists(payloadSpecs))) {
    return;
  }
  await mkdir(targetDir, { recursive: true });
  await cp(payloadSpecs, targetSpecs, { recursive: true, force: true });
}

/**
 * Run full Beta1 repo bootstrap for a resolved payload root and target directory.
 */
export async function runRepoBootstrap({ payloadRoot, targetDir }) {
  const absTarget = resolve(targetDir);
  if (!(await pathExists(payloadRoot))) {
    throw new Error(
      `spar-kit: install payload not found at ${payloadRoot}. Is the package installed correctly?`,
    );
  }

  const warnings = [];
  await applyAgentsMd(payloadRoot, absTarget, warnings);
  await applyJustfile(payloadRoot, absTarget, warnings);
  await applySparKitVersion(payloadRoot, absTarget);
  await applySparKitLocalAbsentOnly(payloadRoot, absTarget, warnings);
  await applyAgentsSkills(payloadRoot, absTarget);
  await applySpecsTree(payloadRoot, absTarget);

  return { warnings };
}
