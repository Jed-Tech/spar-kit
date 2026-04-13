/**
 * pack-prep: version sync, payload verification, and CLI smoke (see specs/active/pack-prep/).
 */
import { strict as assert } from "node:assert";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { cp, mkdtemp, writeFile, mkdir, rm, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import {
  readCanonicalVersion,
  syncVersions,
  verifyInstallPayload,
  runPackPrep,
} from "../lib/pack-prep.mjs";

const execFileP = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const packPrepCli = join(repoRoot, "lib", "pack-prep.mjs");

async function mktemp(prefix) {
  return mkdtemp(join(tmpdir(), prefix));
}

async function makeFixtureRepo() {
  const dir = await mktemp("spar-pp-fix-");
  await cp(join(repoRoot, "install-root"), join(dir, "install-root"), { recursive: true });
  await cp(join(repoRoot, "VERSION"), join(dir, "VERSION"));
  await cp(join(repoRoot, "package.json"), join(dir, "package.json"));
  return dir;
}

test("readCanonicalVersion + syncVersions: all three locations match", async () => {
  const dir = await mktemp("spar-pp-sync-");
  try {
    await writeFile(join(dir, "VERSION"), "9.8.7-test\n", "utf8");
    await mkdir(join(dir, "install-root", ".spar-kit"), { recursive: true });
    await writeFile(
      join(dir, "package.json"),
      JSON.stringify({ name: "x", version: "0.0.0" }, null, 2) + "\n",
      "utf8",
    );

    const v = await readCanonicalVersion(dir);
    assert.equal(v, "9.8.7-test");
    await syncVersions(dir, v);

    const rootV = (await readFile(join(dir, "VERSION"), "utf8")).trim();
    const payloadV = (await readFile(join(dir, "install-root", ".spar-kit", "VERSION"), "utf8")).trim();
    const pkg = JSON.parse(await readFile(join(dir, "package.json"), "utf8"));
    assert.equal(rootV, "9.8.7-test");
    assert.equal(payloadV, "9.8.7-test");
    assert.equal(pkg.version, "9.8.7-test");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("verifyInstallPayload fails when a required path is missing", async () => {
  const dir = await mktemp("spar-pp-miss-");
  try {
    await mkdir(join(dir, "install-root"), { recursive: true });
    let threw = false;
    try {
      await verifyInstallPayload(dir);
    } catch (e) {
      threw = true;
      assert.ok(e instanceof Error);
      assert.ok(e.message.includes("AGENTS.md"));
    }
    assert.ok(threw);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("runPackPrep on fixture copy: versions aligned, payload OK (tests off)", async () => {
  const dir = await makeFixtureRepo();
  try {
    await runPackPrep(dir, { runTests: false });
    const v = (await readFile(join(dir, "VERSION"), "utf8")).trim();
    const payloadV = (await readFile(join(dir, "install-root", ".spar-kit", "VERSION"), "utf8")).trim();
    const pkg = JSON.parse(await readFile(join(dir, "package.json"), "utf8"));
    assert.equal(payloadV, v);
    assert.equal(pkg.version, v);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("CLI: pack-prep exits 0 with skip-tests env; cwd is fixture repo", async () => {
  const dir = await makeFixtureRepo();
  try {
    const env = { ...process.env, SPAR_KIT_PACK_PREP_SKIP_TESTS: "1" };
    const { stdout, stderr } = await execFileP(process.execPath, [packPrepCli], {
      cwd: dir,
      encoding: "utf8",
      env,
    });
    assert.equal(stderr, "");
    assert.match(stdout, /Ready for npm pack\./);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
