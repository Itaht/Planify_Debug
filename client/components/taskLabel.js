export function TaskLabel() {
  const labelPopup = document.getElementById("label-popup");
  const doneLabelButton = document.getElementById("done-label-button");
  const labelOptions = document.querySelectorAll(".label-option");
  const setLabelButton = document.getElementById("set-label-button");

  let selectedColorButton = null; // Track the currently selected color button

  // Show the Label Popup
  function showLabelPopup() {
    if (labelPopup) {
      labelPopup.style.display = "block"; // Show the popup
    } else {
      console.error("Label popup element not found.");
    }
  }

  // Hide the Label Popup
  function hideLabelPopup() {
    if (labelPopup) {
      labelPopup.style.display = "none"; // Hide the popup
    }
  }

  // Handle Label Selection
  labelOptions.forEach((button) => {
    button.addEventListener("click", () => {
      // Clear the previous selection
      if (selectedColorButton) {
        selectedColorButton.innerHTML = ""; // Remove the checkmark
      }

      // Mark the clicked button as selected
      selectedColorButton = button;
      button.innerHTML = "✓"; // Add the checkmark symbol

      console.log("Selected color:", button.getAttribute("data-color"));
    });
  });

  // Handle Done Button Click
  doneLabelButton.addEventListener("click", () => {
    if (selectedColorButton) {
      const selectedColor = selectedColorButton.getAttribute("data-color");

    // Update the "set-label-button" with the selected color
    setLabelButton.style.backgroundColor = selectedColor;
    setLabelButton.style.border = "none"; // Remove border for a clean look
    setLabelButton.textContent = ""; // Clear any existing text

    // Ensure the button retains its original size
    setLabelButton.style.width = "27%"; // Adjust width as needed
    setLabelButton.style.height = "35%";
    setLabelButton.style.borderRadius = "12px"; // Optional: add rounded corners
    setLabelButton.style.border = "1px solid #949AA0"; // Optional: add border to the button

      hideLabelPopup(); // Close the popup
    } else {
      alert("Please select a color before clicking 'Done'.");
    }
  });

  // Hide the popup on outside click
  document.addEventListener("click", (event) => {
    if (
      labelPopup &&
      !labelPopup.contains(event.target) &&
      event.target.id !== "set-label-button"
    ) {
      hideLabelPopup();
    }
  });

  return {
    showLabelPopup,
  };
}
