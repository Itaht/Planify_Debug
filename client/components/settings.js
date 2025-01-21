export function SettingsPopup() {
  // Get references to settings-related elements
  const settingsPopupOverlay = document.querySelector("#settings-popup");
  const settingsButton = document.querySelector("#settings-icon");
  const closeSettingsPopupButton = document.querySelector(
    "#close-settings-popup-button",
  );
  const editBoardButton = document.getElementById("edit-board");
  const deleteBoardButton = document.getElementById("delete-board");

  // Validate existence of required DOM elements
  if (!settingsPopupOverlay || !settingsButton) {
    console.error("SettingsPopup component: Missing required DOM elements.");
    return;
  }

  console.log("SettingsPopup: All required DOM elements found.");

  // Toggle the popup visibility when the settings button is clicked
  settingsButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click propagation
    settingsPopupOverlay.classList.toggle("hidden"); // Toggle the popup visibility
    console.log("SettingsPopup: Popup toggled.");
  });

  // Close the popup when the close button is clicked
  if (closeSettingsPopupButton) {
    closeSettingsPopupButton.addEventListener("click", () => {
      settingsPopupOverlay.classList.add("hidden"); // Hide the popup
      console.log("SettingsPopup: Popup closed via close button.");
    });
  }

  // Close the popup when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !settingsPopupOverlay.contains(event.target) &&
      event.target !== settingsButton
    ) {
      settingsPopupOverlay.classList.add("hidden"); // Hide the popup
      console.log("SettingsPopup: Popup closed via outside click.");
    }
  });

  // Add functionality for editing the board
  if (editBoardButton) {
    editBoardButton.addEventListener("click", () => {
      alert("Edit board functionality is under development!");
      console.log("SettingsPopup: Edit board clicked.");
    });
  }

  // Add functionality for deleting the board
  if (deleteBoardButton) {
    deleteBoardButton.addEventListener("click", () => {
      const confirmation = confirm(
        "Are you sure you want to delete this board?",
      );
      if (confirmation) {
        alert("Board deleted successfully!");
        console.log("SettingsPopup: Delete board confirmed.");
        // Add logic to handle board deletion if needed
      }
    });
  }
}
