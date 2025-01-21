export function ConfirmationPopup() {
  const confirmationPopup = document.querySelector('#confirmation-popup');
  const cancelDiscardButton = document.querySelector('#cancel-discard-button');
  const discardButton = document.querySelector('#discard-button');

  // Close the confirmation popup when clicking the cancel button
  cancelDiscardButton.addEventListener('click', () => {
    confirmationPopup.classList.add('hidden');
  });

  // Close the confirmation popup when clicking the discard button
  discardButton.addEventListener('click', () => {
    confirmationPopup.classList.add('hidden');
  });

  // Close the confirmation popup when clicking on the overlay
  confirmationPopup.addEventListener('click', (event) => {
    if (event.target === confirmationPopup) {
      confirmationPopup.classList.add('hidden');
    }
  });

  // Function to show the confirmation popup
  function showConfirmationPopup() {
    confirmationPopup.classList.remove('hidden');
  }

  // Function to hide the confirmation popup
  function hideConfirmationPopup() {
    confirmationPopup.classList.add('hidden');
  }

  return {
    showConfirmationPopup,
    hideConfirmationPopup
  };
}
