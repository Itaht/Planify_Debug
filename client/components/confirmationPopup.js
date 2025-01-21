export function ConfirmationPopup() {
    const confirmationPopup = document.querySelector('#confirmation-popup');
    const cancelDiscardButton = document.querySelector('#cancel-discard-button');
    const discardButton = document.querySelector('#discard-button');
    
    // Event listener for the cancel button to hide the confirmation popup
    cancelDiscardButton.addEventListener('click', function () {
      confirmationPopup.classList.add('hidden');
    });
  
    // Event listener for the discard button to handle discard logic
    discardButton.addEventListener('click', function () {
      // Implement your discard changes logic here
      console.log('Changes discarded.');
      
      // Hide the confirmation popup after discarding
      confirmationPopup.classList.add('hidden');
    });
  
    // Function to show the confirmation popup
    function showConfirmationPopup() {
      confirmationPopup.classList.remove('hidden');
    }
  
    // Function to hide the confirmation popup
    function hideConfirmationPopup() {
      confirmationPopup.classList.add('hidden');
    }
  
    // Expose these functions to be called from outside if needed
    return {
      showConfirmationPopup,
      hideConfirmationPopup
    };
  }
  