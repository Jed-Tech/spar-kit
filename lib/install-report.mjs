/**
 * Beta1 installer reporting (install-report_spec.md): fixed layout, stdout.
 */
import process from "node:process";

const NEXT_STEP_LINE = "Next: Ask your agent to use spar.init.";

/**
 * @param {{ outcome: 'success' | 'failure'; warnings?: string[]; detail?: string }} opts
 * @returns {string}
 */
export function formatInstallReport({ outcome, warnings = [], detail }) {
  const lines = [`Outcome: ${outcome}`];

  if (outcome === "success") {
    if (warnings.length > 0) {
      lines.push("");
      lines.push("Warnings:");
      for (const w of warnings) {
        lines.push(`- ${w}`);
      }
    }
    lines.push("");
    lines.push(NEXT_STEP_LINE);
  } else {
    if (detail) {
      lines.push("");
      lines.push(detail);
    }
  }

  return `${lines.join("\n")}\n`;
}

/**
 * Write Beta1 install report to stdout (install-report_spec.md).
 * @param {{ outcome: 'success' | 'failure'; warnings?: string[]; detail?: string }} opts
 */
export function writeInstallReport(opts) {
  process.stdout.write(formatInstallReport(opts));
}
