export function TaskLabel() {
  const labelPopup = document.getElementById("label-popup");
  const doneLabelButton = document.getElementById("done-label-button");
  const labelOptions = document.querySelectorAll(".label-option");

  let selectedLabelColor = null;

  // Show the Label Popup
  function showLabelPopup() {
    if (labelPopup) {
      console.log("Button clicked, showing label popup.");
      labelPopup.classList.remove("hidden");
    } else {
      console.error("Label popup element not found.");
    }
  }

  // Hide the Label Popup
  function hideLabelPopup() {
    if (labelPopup) {
      labelPopup.classList.add("hidden");
    }
  }

  // Handle Label Selection
  labelOptions.forEach((option) => {
    option.addEventListener("click", () => {
      selectedLabelColor = option.getAttribute("data-color");

      labelOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
    });
  });

  // Handle Done Button Click
  doneLabelButton.addEventListener("click", () => {
    console.log("Selected label color:", selectedLabelColor);
    hideLabelPopup();
  });

  return {
    showLabelPopup,
  };
}
