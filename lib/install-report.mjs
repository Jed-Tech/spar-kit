/**

 * Beta1 installer reporting (install-report_spec.md): fixed layout, stdout.

 */

import process from "node:process";



const NEXT_STEP_LINE = "To finalize setup: Ask your AI agent to: Use the spar.init skill";

/** Separates our next-step line from the shell prompt / cwd line that follows. */

const PROMPT_SEPARATOR_LINE = "  ↑  ↑  ↑  ↑  ↑";



/**

 * @param {{ outcome: 'success' | 'failure'; warnings?: string[]; detail?: string }} opts

 * @returns {string}

 */

export function formatInstallReport({ outcome, warnings = [], detail }) {

  const outcomeLabel = outcome === "success" ? "Success" : "Failure";

  const lines = [`Outcome: ${outcomeLabel}`];



  if (outcome === "success") {

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
