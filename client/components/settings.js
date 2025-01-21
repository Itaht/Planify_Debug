export function SettingsPopup() {
  const settingsPopupOverlay = document.querySelector('#settings-popup');
  const settingsButton = document.querySelector('#settings-icon');  // Get the button by ID
  const closeSettingsPopupButton = document.querySelector('#close-settings-popup-button');
  
  const editBoard = document.getElementById('edit-board');
  const deleteBoard = document.getElementById('delete-board');

  // Add an event listener to toggle the popup visibility
  settingsButton.addEventListener('click', function () {
    settingsPopupOverlay.classList.toggle('hidden'); // Toggle the popup visibility
  });

  // Close the settings popup when the close button is clicked
  closeSettingsPopupButton.addEventListener('click', function () {
    settingsPopupOverlay.classList.add('hidden'); // Hide the popup
  });

  // Close the settings popup when clicked outside
  settingsPopupOverlay.addEventListener('click', function (event) {
    if (event.target === settingsPopupOverlay) {
      settingsPopupOverlay.classList.add('hidden'); // Hide the popup if clicked outside
    }
  });

  // Event listener for the editBoard button
  editBoard.addEventListener('click', () => {
    alert('Edit board functionality coming soon!');
  });

  // Event listener for the deleteBoard button
  deleteBoard.addEventListener('click', () => {
    alert('Delete board functionality coming soon!');
  });
}
