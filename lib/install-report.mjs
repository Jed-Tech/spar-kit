/**
 * Installer reporting: fixed layout, stdout.
 */
import process from "node:process";

const NEXT_STEP_LINE = "To finalize setup: Ask your AI agent to: Use the spar-init skill";
const PROMPT_SEPARATOR_LINE = "  ↑  ↑  ↑  ↑  ↑";

/**
 * @param {{ outcome: 'success' | 'failure'; warnings?: string[]; detail?: string; targets?: string[] }} opts
 * @returns {string}
 */
export function formatInstallReport({ outcome, warnings = [], detail, targets = [] }) {
  const outcomeLabel = outcome === "success" ? "Success" : "Failure";
  const lines = [`Outcome: ${outcomeLabel}`];

  if (outcome === "success") {
    if (targets.length > 0) {
      lines.push("");
      lines.push(`Installed targets: ${targets.join(", ")}`);
    }

    if (warnings.length > 0) {
      lines.push("");
      lines.push("Notes:");
      for (const w of warnings) {
        lines.push(`- ${w}`);
      }
    }

    lines.push("");
    lines.push(NEXT_STEP_LINE);
    lines.push(PROMPT_SEPARATOR_LINE);
  } else if (detail) {
    lines.push("");
    lines.push(detail);
  }

  return `${lines.join("\n")}\n`;
}

/**
 * @param {{ outcome: 'success' | 'failure'; warnings?: string[]; detail?: string; targets?: string[] }} opts
 */
export function writeInstallReport(opts) {
  process.stdout.write(formatInstallReport(opts));
}
