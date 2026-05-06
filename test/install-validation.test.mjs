/**
 * Install validation and upgrade behavior.
 *
 * Run: npm test
 */
import { strict as assert } from "node:assert";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  access,
  cp,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
  mkdir,
} from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { runInstall } from "../lib/install-engine.mjs";
import { getInstallRootPayloadPath } from "../lib/install-engine.mjs";
import { runRepoBootstrap } from "../lib/repo-bootstrap.mjs";

const execFileP = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));

async function pathExists(p) {
  try {
    await access(p, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}
const repoRoot = join(__dirname, "..");
const binCli = join(repoRoot, "bin", "spar-kit.mjs");

async function mktemp(prefix) {
  return mkdtemp(join(tmpdir(), prefix));
}

async function readPayload(rel) {
  const p = join(getInstallRootPayloadPath(), rel);
  return readFile(p, "utf8");
}

test("clean install: repo-root layout matches payload (no install-root/ dir)", async () => {
  const dir = await mktemp("spar-clean-");
  try {
    await runInstall({ targetDir: dir });

    const agents = await readFile(join(dir, "AGENTS.md"), "utf8");
    assert.match(agents, /<!--\s*spar-kit:start\s*-->/);
    assert.match(agents, /spar-specify/);

    assert.equal(await pathExists(join(dir, "justfile")), false);

    const v = await readFile(join(dir, ".spar-kit", "VERSION"), "utf8");
    const payloadV = await readPayload(join(".spar-kit", "VERSION"));
    assert.equal(v.trim(), payloadV.trim());

    const tools = await readFile(join(dir, ".spar-kit", ".local", "tools.yaml"), "utf8");
    assert.match(tools, /core_cli:/);
    const coreTools = tools.slice(tools.indexOf("core_cli:"), tools.indexOf("optional_cli:"));
    assert.doesNotMatch(coreTools, /name: just/);
    assert.match(tools, /optional_cli:/);
    assert.match(tools, /name: just/);
    assert.match(tools, /name: rg/);
    assert.match(tools, /name: jq/);

    await readFile(join(dir, "specs", "README.md"), "utf8");
    assert.ok(await pathExists(join(dir, "specs", "active", ".gitkeep")));
    assert.ok(await pathExists(join(dir, "specs", "completed", ".gitkeep")));

    const skills = await readdir(join(dir, ".agents", "skills"));
    for (const name of ["spar-init", "spar-specify", "spar-plan", "spar-act", "spar-retain"]) {
      assert(skills.includes(name), `missing managed skill ${name}`);
      await readFile(join(dir, ".agents", "skills", name, "SKILL.md"), "utf8");
    }
    assert.equal(skills.includes("just"), false);

    const root = await readdir(dir);
    assert(!root.includes("install-root"), "must not create install-root/ at repo root");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("clean Claude install: native Claude layout is installed without general .agents surface", async () => {
  const dir = await mktemp("spar-claude-");
  try {
    await runInstall({ targetDir: dir, targets: ["claude"] });

    const claude = await readFile(join(dir, "CLAUDE.md"), "utf8");
    assert.match(claude, /<!--\s*spar-kit:start\s*-->/);
    assert.match(claude, /spar-specify/);
    assert.equal(await pathExists(join(dir, "AGENTS.md")), false);
    assert.equal(await pathExists(join(dir, ".agents")), false);

    const skills = await readdir(join(dir, ".claude", "skills"));
    for (const name of ["spar-init", "spar-specify", "spar-plan", "spar-act", "spar-retain"]) {
      assert(skills.includes(name), `missing Claude skill ${name}`);
      await readFile(join(dir, ".claude", "skills", name, "SKILL.md"), "utf8");
    }
    assert.equal(skills.includes("just"), false);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("clean Codex install: explicit Codex target matches .agents layout", async () => {
  const dir = await mktemp("spar-codex-");
  try {
    await runInstall({ targetDir: dir, targets: ["codex"] });

    const agents = await readFile(join(dir, "AGENTS.md"), "utf8");
    assert.match(agents, /<!--\s*spar-kit:start\s*-->/);
    assert.equal(await pathExists(join(dir, "CLAUDE.md")), false);

    const skills = await readdir(join(dir, ".agents", "skills"));
    for (const name of ["spar-init", "spar-specify", "spar-plan", "spar-act", "spar-retain"]) {
      assert(skills.includes(name), `missing Codex skill ${name}`);
    }
    assert.equal(skills.includes("just"), false);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("multi-target install: Claude and Cursor layouts both materialize when both flags are requested", async () => {
  const dir = await mktemp("spar-multi-");
  try {
    await runInstall({ targetDir: dir, targets: ["claude", "cursor"] });
    assert.equal(await pathExists(join(dir, "CLAUDE.md")), true);
    assert.equal(await pathExists(join(dir, "AGENTS.md")), true);
    assert.equal(await pathExists(join(dir, ".claude", "skills", "spar-init", "SKILL.md")), true);
    assert.equal(await pathExists(join(dir, ".cursor", "skills", "spar-init", "SKILL.md")), true);
    assert.equal(await pathExists(join(dir, ".agents")), false);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("reinstall: AGENTS.md SPAR block is idempotent (no duplicate markers)", async () => {
  const dir = await mktemp("spar-agents-");
  try {
    await runInstall({ targetDir: dir });
    const a1 = await readFile(join(dir, "AGENTS.md"), "utf8");
    await runInstall({ targetDir: dir });
    const a2 = await readFile(join(dir, "AGENTS.md"), "utf8");
    assert.equal(a1, a2);
    const matches = a2.match(/<!--\s*spar-kit:start\s*-->/g);
    assert.equal(matches?.length, 1);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("reinstall: existing justfile is ignored by SPAR-kit; managed VERSION still updates", async () => {
  const dir = await mktemp("spar-just-");
  try {
    await writeFile(join(dir, "justfile"), "user-just:\n  @echo ok\n", "utf8");
    const { warnings } = await runInstall({ targetDir: dir });
    assert.equal(warnings.some((w) => w.includes("justfile")), false);
    const jf = await readFile(join(dir, "justfile"), "utf8");
    assert.ok(jf.includes("user-just"), "justfile must not be overwritten");

    const v1 = await readFile(join(dir, ".spar-kit", "VERSION"), "utf8");
    await runInstall({ targetDir: dir });
    const v2 = await readFile(join(dir, ".spar-kit", "VERSION"), "utf8");
    assert.equal(v1.trim(), v2.trim());
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("reinstall: .spar-kit/.local/tools.yaml preserved; VERSION still from payload", async () => {
  const dir = await mktemp("spar-local-");
  try {
    await mkdir(join(dir, ".spar-kit", ".local"), { recursive: true });
    await writeFile(join(dir, ".spar-kit", ".local", "tools.yaml"), "custom: preserved\n", "utf8");
    const { warnings } = await runInstall({ targetDir: dir });
    assert.ok(
      warnings.some((w) => w.includes("tools.yaml") && w.includes("Preserved")),
      "expected tools.yaml preservation warning",
    );
    const local = await readFile(join(dir, ".spar-kit", ".local", "tools.yaml"), "utf8");
    assert.equal(local, "custom: preserved\n");

    const ver = await readFile(join(dir, ".spar-kit", "VERSION"), "utf8");
    const payloadV = await readPayload(join(".spar-kit", "VERSION"));
    assert.equal(ver.trim(), payloadV.trim());
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("reinstall: non-SPAR skill directory under .agents/skills/ is preserved", async () => {
  const dir = await mktemp("spar-skills-");
  try {
    await mkdir(join(dir, ".agents", "skills", "user-custom"), { recursive: true });
    await writeFile(
      join(dir, ".agents", "skills", "user-custom", "SKILL.md"),
      "keep me\n",
      "utf8",
    );
    await runInstall({ targetDir: dir });
    const skills = await readdir(join(dir, ".agents", "skills"));
    assert.ok(skills.includes("user-custom"));
    const kept = await readFile(join(dir, ".agents", "skills", "user-custom", "SKILL.md"), "utf8");
    assert.equal(kept, "keep me\n");
    assert.ok(skills.includes("spar-init"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("specs/README.md materializes from payload (SPAR-managed)", async () => {
  const dir = await mktemp("spar-specs-");
  try {
    await runInstall({ targetDir: dir });
    const a = await readFile(join(dir, "specs", "README.md"), "utf8");
    const b = await readPayload(join("specs", "README.md"));
    assert.equal(a, b);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("AGENTS.md: prepend when file exists without SPAR markers", async () => {
  const dir = await mktemp("spar-prepend-");
  try {
    await writeFile(join(dir, "AGENTS.md"), "# User\n\nbody\n", "utf8");
    await runInstall({ targetDir: dir });
    const out = await readFile(join(dir, "AGENTS.md"), "utf8");
    assert.match(out, /<!--\s*spar-kit:start\s*-->/);
    assert.ok(out.includes("# User"));
    assert.ok(out.includes("body"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("CLI stdout: success without warnings matches install-report layout", async () => {
  const dir = await mktemp("spar-cli-ok-");
  try {
    const { stdout } = await execFileP(process.execPath, [binCli, dir], {
      encoding: "utf8",
    });
    assert.match(stdout, /^Outcome: Success\r?\n\r?\nInstalled targets: general\r?\n/);
    assert.ok(stdout.includes("To finalize setup") && stdout.includes("spar-init"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("CLI stdout: existing justfile does not produce SPAR-kit notes", async () => {
  const dir = await mktemp("spar-cli-just-");
  try {
    await writeFile(join(dir, "justfile"), "x:\n", "utf8");
    const { stdout } = await execFileP(process.execPath, [binCli, dir], {
      encoding: "utf8",
    });
    assert.match(stdout, /^Outcome: Success\r?\n\r?\nInstalled targets: general\r?\n/);
    assert.equal(stdout.includes("Notes:"), false);
    assert.equal(stdout.includes("justfile"), false);
    assert.ok(stdout.includes("To finalize setup") && stdout.includes("spar-init"));
    assert.equal((await readFile(join(dir, "justfile"), "utf8")), "x:\n");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("CLI stdout: explicit target install reports installed targets", async () => {
  const dir = await mktemp("spar-cli-targets-");
  try {
    const { stdout } = await execFileP(
      process.execPath,
      [binCli, dir, "--claude", "--cursor"],
      { encoding: "utf8" },
    );
    assert.match(stdout, /^Outcome: Success\r?\n\r?\nInstalled targets: claude, cursor\r?\n/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("CLI stdout: failure when target path is an existing file", async () => {
  const dir = await mktemp("spar-cli-fail-");
  const bad = join(dir, "not-a-dir");
  try {
    await writeFile(bad, "", "utf8");
    let threw = false;
    try {
      await execFileP(process.execPath, [binCli, bad], { encoding: "utf8" });
    } catch (e) {
      threw = true;
      assert.equal(e.code, 1);
      assert.match(e.stdout, /^Outcome: Failure\r?\n\r?\n/);
      assert.ok(e.stdout.includes("EEXIST") || e.stdout.includes("mkdir"));
    }
    assert.ok(threw);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("CLI stdout: no args installs into cwd", async () => {
  const dir = await mktemp("spar-cli-cwd-");
  try {
    const { stdout } = await execFileP(process.execPath, [binCli], {
      cwd: dir,
      encoding: "utf8",
    });
    assert.match(stdout, /^Outcome: Success\r?\n\r?\nInstalled targets: general\r?\n/);
    assert.equal(await pathExists(join(dir, "AGENTS.md")), true);
    assert.equal(await pathExists(join(dir, ".spar-kit", "VERSION")), true);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("upgrade: .spar-kit/VERSION updates when second payload has a newer VERSION string", async () => {
  const targetDir = await mktemp("spar-upgrade-target-");
  const payloadV1 = await mktemp("spar-payload-v1-");
  const payloadV2 = await mktemp("spar-payload-v2-");
  const base = getInstallRootPayloadPath();
  try {
    await cp(base, payloadV1, { recursive: true });
    await cp(base, payloadV2, { recursive: true });
    await writeFile(join(payloadV1, ".spar-kit", "VERSION"), "0.9.0-payload-test\n", "utf8");
    await writeFile(join(payloadV2, ".spar-kit", "VERSION"), "0.10.0-payload-test\n", "utf8");

    await runRepoBootstrap({ payloadRoot: payloadV1, targetDir, targets: ["general"] });
    assert.equal(
      (await readFile(join(targetDir, ".spar-kit", "VERSION"), "utf8")).trim(),
      "0.9.0-payload-test",
    );

    await runRepoBootstrap({ payloadRoot: payloadV2, targetDir, targets: ["general"] });
    assert.equal(
      (await readFile(join(targetDir, ".spar-kit", "VERSION"), "utf8")).trim(),
      "0.10.0-payload-test",
    );
  } finally {
    await rm(targetDir, { recursive: true, force: true });
    await rm(payloadV1, { recursive: true, force: true });
    await rm(payloadV2, { recursive: true, force: true });
  }
});

test("AGENTS.md: malformed marker (start without end) leaves file unchanged and warns", async () => {
  const dir = await mktemp("spar-agents-bad-");
  const brokenTail = [
    "# User repo notes",
    "<!-- spar-kit:start -->",
    "orphaned line - no spar-kit:end marker",
    "",
    "More user content.",
  ].join("\n");
  try {
    await writeFile(join(dir, "AGENTS.md"), brokenTail, "utf8");
    const { warnings } = await runInstall({ targetDir: dir });
    const out = await readFile(join(dir, "AGENTS.md"), "utf8");
    assert.equal(out, brokenTail);
    assert.ok(
      warnings.some(
        (w) =>
          w.includes("AGENTS.md") &&
          w.includes("malformed") &&
          w.includes("unchanged"),
      ),
    );
    const starts = out.match(/<!--\s*spar-kit:start\s*-->/g);
    assert.equal(starts?.length, 1);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("AGENTS.md: duplicate complete SPAR blocks collapse to one canonical block", async () => {
  const dir = await mktemp("spar-agents-dup-");
  const payloadPath = join(getInstallRootPayloadPath(), "AGENTS.md");
  try {
    const payloadText = await readFile(payloadPath, "utf8");
    const m = payloadText.match(
      /<!--\s*spar-kit:start\s*-->[\s\S]*?<!--\s*spar-kit:end\s*-->/,
    );
    assert.ok(m);
    const block = m[0];
    await writeFile(join(dir, "AGENTS.md"), `${block}\n\n${block}\n`, "utf8");
    const { warnings } = await runInstall({ targetDir: dir });
    const out = await readFile(join(dir, "AGENTS.md"), "utf8");
    const starts = out.match(/<!--\s*spar-kit:start\s*-->/g) || [];
    assert.equal(starts.length, 1);
    assert.ok(!warnings.some((w) => w.includes("malformed")));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
