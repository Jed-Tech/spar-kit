const statusNode = document.getElementById("copy-status");
const installCommandNode = document.getElementById("install-command");
const installGuidanceNode = document.getElementById("install-guidance");
const installOptionNodes = document.querySelectorAll("[data-install-option]");
const moreTargetsNode = document.querySelector(".more-targets");

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

function setInstallOption(activeButton) {
  if (!activeButton || !installCommandNode) {
    return;
  }

  const command = activeButton.getAttribute("data-command") || "";
  const description = activeButton.getAttribute("data-description") || "";

  installOptionNodes.forEach((button) => {
    const isActive = button === activeButton;
    button.setAttribute("aria-pressed", String(isActive));
    button.classList.toggle("is-selected", isActive);
  });

  installCommandNode.textContent = command;

  if (installGuidanceNode) {
    installGuidanceNode.textContent = description;
  }

  if (moreTargetsNode && !moreTargetsNode.contains(activeButton)) {
    moreTargetsNode.open = false;
  }

  announceStatus(`Install target set to ${activeButton.textContent || "selected option"}.`);
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

installOptionNodes.forEach((button) => {
  button.addEventListener("click", () => {
    setInstallOption(button);
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
