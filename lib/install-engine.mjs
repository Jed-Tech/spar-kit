/**
 * Beta1 installer engine: locate bundled install-root/ and run repo bootstrap at the
 * consumer repo root (no literal `install-root/` directory in the target).
 */
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { runRepoBootstrap } from "./repo-bootstrap.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getInstallRootPayloadPath() {
  return resolve(__dirname, "..", "install-root");
}

export async function runInstall({ targetDir }) {
  const payloadRoot = getInstallRootPayloadPath();
  return runRepoBootstrap({ payloadRoot, targetDir });
}
