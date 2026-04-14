/**
 * Phase 5 — Beta1 install validation (implementation-plan.md).
 * Hardening: payload upgrade + malformed AGENTS markers (see tests at end).
 *
 * Environment: this suite is run and passing on **Windows 10** with **Node.js 22** (see `npm test`
 * output in CI or locally). No separate macOS/Linux run is performed in the default workflow;
 * running `npm test` on those platforms before release is still recommended to confirm identical
 * Node `fs` behavior for temp dirs, `fs.cp`, and `mkdtemp` (no divergence observed on Windows).
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

test("clean Beta1 install: repo-root layout matches payload (no install-root/ dir)", async () => {
  const dir = await mktemp("spar-clean-");
  try {
    await runInstall({ targetDir: dir });

    const agents = await readFile(join(dir, "AGENTS.md"), "utf8");
    assert.match(agents, /<!--\s*spar-kit:start\s*-->/);
    assert.match(agents, /spar\.specify/);

    const payloadJf = await readPayload("justfile");
    const targetJf = await readFile(join(dir, "justfile"), "utf8");
    assert.equal(targetJf, payloadJf);

    const v = await readFile(join(dir, ".spar-kit", "VERSION"), "utf8");
    const payloadV = await readPayload(join(".spar-kit", "VERSION"));
    assert.equal(v.trim(), payloadV.trim());

    await readFile(join(dir, ".spar-kit", ".local", "tools.yaml"), "utf8");

    await readFile(join(dir, "specs", "README.md"), "utf8");
    assert.ok(await pathExists(join(dir, "specs", "active", ".gitkeep")));
    assert.ok(await pathExists(join(dir, "specs", "completed", ".gitkeep")));

    const skills = await readdir(join(dir, ".agents", "skills"));
    for (const name of ["spar-init", "spar-specify", "spar-plan", "spar-act", "spar-retain"]) {
      assert(skills.includes(name), `missing managed skill ${name}`);
      await readFile(join(dir, ".agents", "skills", name, "SKILL.md"), "utf8");
    }

    const root = await readdir(dir);
    assert(!root.includes("install-root"), "must not create install-root/ at repo root");
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

test("reinstall: existing justfile is preserved; managed VERSION still updates", async () => {
  const dir = await mktemp("spar-just-");
  try {
    await writeFile(join(dir, "justfile"), "user-just:\n  @echo ok\n", "utf8");
    const { warnings } = await runInstall({ targetDir: dir });
    assert.ok(
      warnings.some((w) => w.includes("justfile") && w.includes("preserved")),
      "expected justfile warning",
    );
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
    const { stdout } = await execFileP(process.execPath, [binCli, "install", dir], {
      encoding: "utf8",
    });
    assert.match(
      stdout,
      /^Outcome: Success\r?\n\r?\nTo finalize setup: Ask your AI agent to: Use the spar\.init skill\r?\n  ↑  ↑  ↑  ↑  ↑\r?\n$/,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("CLI stdout: success with preserved justfile includes Notes section", async () => {
  const dir = await mktemp("spar-cli-warn-");
  try {
    await writeFile(join(dir, "justfile"), "x:\n", "utf8");
    const { stdout } = await execFileP(process.execPath, [binCli, "install", dir], {
      encoding: "utf8",
    });
    assert.match(stdout, /^Outcome: Success\r?\n\r?\nNotes:\r?\n/);
    assert.ok(stdout.includes("justfile"));
    assert.ok(stdout.includes("To finalize setup") && stdout.includes("spar.init"));
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
      await execFileP(process.execPath, [binCli, "install", bad], { encoding: "utf8" });
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

/**
 * Simulates two published payload trees with different `.spar-kit/VERSION` strings.
 * Uses `fs.cp` + `os.tmpdir()` (validated on Windows/Node 22 in this repo; other OS still worth a quick `npm test`).
 */
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

    await runRepoBootstrap({ payloadRoot: payloadV1, targetDir });
    assert.equal(
      (await readFile(join(targetDir, ".spar-kit", "VERSION"), "utf8")).trim(),
      "0.9.0-payload-test",
    );

    await runRepoBootstrap({ payloadRoot: payloadV2, targetDir });
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

/**
 * Malformed AGENTS: orphan `spar-kit:start` without `spar-kit:end` cannot be stripped safely;
 * Beta1 leaves the file unchanged and emits a warning (no duplicate SPAR content).
 */
test("AGENTS.md: malformed marker (start without end) leaves file unchanged and warns", async () => {
  const dir = await mktemp("spar-agents-bad-");
  const brokenTail = [
    "# User repo notes",
    "<!-- spar-kit:start -->",
    "orphaned line — no spar-kit:end marker",
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

/**
 * Two adjacent well-formed SPAR blocks (e.g. duplicate paste) strip to no markers and rebuild
 * as a single canonical AGENTS.md — exactly one start marker in the output.
 */
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
