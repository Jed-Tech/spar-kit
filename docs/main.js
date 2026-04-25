const statusNode = document.getElementById("copy-status");
const installCommandNode = document.getElementById("install-command");

function selectNodeText(node) {
  if (!node) {
    return;
  }

  const selection = window.getSelection();

  if (!selection) {
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
}

function announceStatus(message) {
  if (!statusNode) {
    return;
  }

  statusNode.textContent = "";

  window.setTimeout(() => {
    statusNode.textContent = message;
  }, 40);
}

async function copyText(button) {
  const targetId = button.getAttribute("data-copy-target");
  const defaultLabel = button.getAttribute("data-default-label") || "Copy";
  const successLabel = button.getAttribute("data-success-label") || "Copied";
  const target = targetId ? document.getElementById(targetId) : null;

  if (!target) {
    return;
  }

  const text = target.textContent || "";

  try {
    await navigator.clipboard.writeText(text);
    button.textContent = successLabel;
    announceStatus("Install command copied to clipboard.");

    window.clearTimeout(button.resetTimer);
    button.resetTimer = window.setTimeout(() => {
      button.textContent = defaultLabel;
    }, 1800);
  } catch {
    button.textContent = "Press Ctrl+C";
    announceStatus("Copy failed. Select the command and copy it manually.");

    window.clearTimeout(button.resetTimer);
    button.resetTimer = window.setTimeout(() => {
      button.textContent = defaultLabel;
    }, 2200);
  }
}

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", () => {
    copyText(button);
  });
});

if (installCommandNode) {
  installCommandNode.addEventListener("click", () => {
    selectNodeText(installCommandNode);
    announceStatus("Install command selected.");
  });

  installCommandNode.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectNodeText(installCommandNode);
      announceStatus("Install command selected.");
    }
  });
}
