/**
 * Beta1 CLI surface: only `install` is a supported public command.
 * Repo bootstrap rules live in repo-bootstrap.mjs (repo-bootstrap_spec.md).
 */
import process from "node:process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { runInstall } from "./install-engine.mjs";
import { writeInstallReport } from "./install-report.mjs";

function usage() {
  return `Usage:
  spar-kit install [directory]

  Applies the packaged install-root/ payload per repo-bootstrap rules (AGENTS.md, justfile,
  .spar-kit/, .agents/skills/, specs/). No top-level install-root/ folder is created in the
  target repository.

  If [directory] is omitted, the current working directory is used.

Beta1: only the install command is supported.
`;
}

export async function main(argv) {
  const [, , cmd, ...rest] = argv;

  if (cmd === undefined || cmd === "-h" || cmd === "--help") {
    process.stdout.write(usage());
    process.exitCode = cmd === undefined ? 1 : 0;
    return;
  }

  if (cmd !== "install") {
    process.stderr.write(`spar-kit: unknown command ${JSON.stringify(cmd)}\n\n`);
    process.stderr.write(usage());
    process.exitCode = 1;
    return;
  }

  const positional = rest.filter((a) => !a.startsWith("-"));
  const flags = new Set(rest.filter((a) => a.startsWith("-")));

  if (flags.has("--help") || flags.has("-h")) {
    process.stdout.write(usage());
    return;
  }

  const targetArg = positional[0];
  const targetDir = targetArg ? resolve(targetArg) : process.cwd();

  try {
    await mkdir(targetDir, { recursive: true });
    const { warnings } = await runInstall({ targetDir });
    writeInstallReport({ outcome: "success", warnings });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    writeInstallReport({ outcome: "failure", detail });
    process.exitCode = 1;
  }
}
