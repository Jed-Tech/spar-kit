/**
 * Beta1 CLI surface: installation is implied by the package entry point.
 * Repo bootstrap rules live in repo-bootstrap.mjs (repo-bootstrap_spec.md).
 */
import process from "node:process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { runInstall } from "./install-engine.mjs";
import { writeInstallReport } from "./install-report.mjs";

const SUPPORTED_TARGET_FLAGS = new Map([
  ["--codex", "codex"],
  ["--claude", "claude"],
  ["--cursor", "cursor"],
  ["--copilot", "copilot"],
  ["--windsurf", "windsurf"],
  ["--gemini", "gemini"],
  ["--opencode", "opencode"],
]);

function usage() {
  return `Usage:
  npx @spar-kit/install [directory] [--codex] [--claude] [--cursor] [--copilot] [--windsurf] [--gemini] [--opencode]

  Applies the packaged install-root/ payload using the default general target when no agent
  flags are provided. Agent flags install target-native instruction and skill locations.
  No top-level install-root/ folder is created in the target repository.

  If [directory] is omitted, the current working directory is used.
`;
}

export async function main(argv) {
  const [, , ...rest] = argv;

  if (rest.includes("-h") || rest.includes("--help")) {
    process.stdout.write(usage());
    return;
  }

  const positional = rest.filter((a) => !a.startsWith("-"));
  const flags = new Set(rest.filter((a) => a.startsWith("-")));

  const unknownFlags = [...flags].filter((f) => !SUPPORTED_TARGET_FLAGS.has(f));
  if (unknownFlags.length > 0) {
    process.stderr.write(
      `spar-kit: unknown flag${unknownFlags.length > 1 ? "s" : ""} ${unknownFlags.map((f) => JSON.stringify(f)).join(", ")}\n\n`,
    );
    process.stderr.write(usage());
    process.exitCode = 1;
    return;
  }
  if (positional.length > 1) {
    process.stderr.write("spar-kit: accepts at most one target directory\n\n");
    process.stderr.write(usage());
    process.exitCode = 1;
    return;
  }

  const targetArg = positional[0];
  const targetDir = targetArg ? resolve(targetArg) : process.cwd();
  const targets = [...flags].map((f) => SUPPORTED_TARGET_FLAGS.get(f));

  try {
    await mkdir(targetDir, { recursive: true });
    const { warnings, targets: installedTargets } = await runInstall({ targetDir, targets });
    writeInstallReport({ outcome: "success", warnings, targets: installedTargets });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    writeInstallReport({ outcome: "failure", detail });
    process.exitCode = 1;
  }
}
