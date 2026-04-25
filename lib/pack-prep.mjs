/**
 * Beta1 pre-pack preparation: sync root VERSION into derived locations, verify install-root
 * payload, run npm test. Invoked by `just pack-prep` (see repo justfile).
 */
import { spawn } from "node:child_process";
import { readFile, writeFile, access, stat, readdir } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

/** Paths relative to repo root; type "dir" | "file". */
export const REQUIRED_INSTALL_PAYLOAD = [
  { rel: join("install-root", "AGENTS.md"), type: "file" },
  { rel: join("install-root", "CLAUDE.md"), type: "file" },
  { rel: join("install-root", "justfile"), type: "file" },
  { rel: join("install-root", "skills"), type: "dir" },
  { rel: join("install-root", "targets", "default.json"), type: "file" },
  { rel: join("install-root", "targets", "general.json"), type: "file" },
  { rel: join("install-root", "targets", "codex.json"), type: "file" },
  { rel: join("install-root", "targets", "claude.json"), type: "file" },
  { rel: join("install-root", ".spar-kit", ".local", "tools.yaml"), type: "file" },
  { rel: join("install-root", "specs", "README.md"), type: "file" },
];

/** When invoked as CLI, repo root is the current working directory (run from package root). */
function repoRootFromCli() {
  return resolve(process.cwd());
}

export async function readCanonicalVersion(repoRoot) {
  const raw = await readFile(join(repoRoot, "VERSION"), "utf8");
  const v = raw.trim();
  if (!v) {
    throw new Error("VERSION is empty; set root VERSION before pack-prep.");
  }
  return v;
}

export async function syncVersions(repoRoot, version) {
  const payloadVersionPath = join(repoRoot, "install-root", ".spar-kit", "VERSION");
  await writeFile(payloadVersionPath, `${version}\n`, "utf8");

  const pkgPath = join(repoRoot, "package.json");
  const pkgRaw = await readFile(pkgPath, "utf8");
  const pkg = JSON.parse(pkgRaw);
  pkg.version = version;
  await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

export async function syncSkillAssetTemplates(repoRoot) {
  const templates = [
    { name: "spec.md", content: await readFile(join(repoRoot, "templates", "spec.md"), "utf8") },
    { name: "plan.md", content: await readFile(join(repoRoot, "templates", "plan.md"), "utf8") },
  ];
  const skillsRoot = join(repoRoot, "install-root", "skills");
  const skillDirs = await readdir(skillsRoot, { withFileTypes: true });

  for (const entry of skillDirs) {
    if (!entry.isDirectory()) {
      continue;
    }
    const assetsDir = join(skillsRoot, entry.name, "assets");
    for (const template of templates) {
      const assetPath = join(assetsDir, template.name);
      try {
        const current = await readFile(assetPath, "utf8");
        if (current !== template.content) {
          await writeFile(assetPath, template.content, "utf8");
        }
      } catch {
        // Missing optional asset files are allowed; sync only files that exist.
      }
    }
  }
}

export async function verifyInstallPayload(repoRoot) {
  for (const { rel, type } of REQUIRED_INSTALL_PAYLOAD) {
    const abs = join(repoRoot, rel);
    try {
      await access(abs, fsConstants.F_OK);
    } catch {
      throw new Error(`Missing required packaged install path: ${rel}`);
    }
    const st = await stat(abs);
    if (type === "dir" && !st.isDirectory()) {
      throw new Error(`Expected directory: ${rel}`);
    }
    if (type === "file" && !st.isFile()) {
      throw new Error(`Expected file: ${rel}`);
    }
  }
}

function runNpmTest(repoRoot) {
  return new Promise((resolve, reject) => {
    const opts = {
      cwd: repoRoot,
      stdio: "inherit",
      shell: true,
      env: process.env,
    };
    const child = spawn("npm", ["test"], opts);
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`npm test exited with code ${code}`));
      }
    });
  });
}

/**
 * @param {string} repoRoot
 * @param {{ runTests?: boolean }} [options]
 *   runTests defaults true. Set false for unit tests. CI may set env SPAR_KIT_PACK_PREP_SKIP_TESTS=1
 *   when invoking the CLI to avoid nested npm test (internal use only).
 */
export async function runPackPrep(repoRoot, options = {}) {
  const runTests =
    options.runTests !== false && process.env.SPAR_KIT_PACK_PREP_SKIP_TESTS !== "1";

  const version = await readCanonicalVersion(repoRoot);
  await syncVersions(repoRoot, version);
  await syncSkillAssetTemplates(repoRoot);
  await verifyInstallPayload(repoRoot);

  if (runTests) {
    await runNpmTest(repoRoot);
  }

  return { version, testsRan: runTests };
}

function printSuccess(version, testsRan) {
  const testLine = testsRan
    ? "Tests passed."
    : "Tests skipped (SPAR_KIT_PACK_PREP_SKIP_TESTS=1 — not for release use).";
  process.stdout.write(
    [
      "",
      `pack-prep: OK — version ${JSON.stringify(version)} synced to install-root/.spar-kit/VERSION and package.json.`,
      "Skill template assets are synced from templates/spec.md and templates/plan.md where present.",
      "Required install-root payload paths are present.",
      testLine,
      "",
      "Ready for npm pack.",
      "",
    ].join("\n"),
  );
}

async function main() {
  const repoRoot = repoRootFromCli();
  try {
    const { version, testsRan } = await runPackPrep(repoRoot);
    printSuccess(version, testsRan);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    process.stderr.write(`pack-prep: FAILED — ${msg}\n`);
    process.exitCode = 1;
  }
}

const entryPath = process.argv[1] && resolve(process.argv[1]);
const thisFile = resolve(fileURLToPath(import.meta.url));
if (entryPath === thisFile) {
  await main();
}
