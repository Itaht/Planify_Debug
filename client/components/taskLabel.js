export function TaskLabel() {
  const labelPopup = document.querySelector('#label-popup');
  const doneLabelButton = document.querySelector('#done-label-button');
  const labelOptions = document.querySelectorAll('.label-option');
  const selectedLabelDisplay = document.querySelector('#selected-label');  // Element to display selected label
  let selectedLabel = null;  // Variable to hold selected label
  
  // Show label popup when needed
  function showLabelPopup() {
    labelPopup.classList.remove('hidden');
  }
  
  // Hide the label popup when 'Done' button is clicked
  doneLabelButton.addEventListener('click', function () {
    if (selectedLabel) {
      selectedLabelDisplay.textContent = `Selected Label: ${selectedLabel}`;
    }
    labelPopup.classList.add('hidden');
  });
  
  // Handle selecting a label from options
  labelOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      selectedLabel = option.getAttribute('data-label'); // Get the label data
      // Optionally highlight the selected label
      labelOptions.forEach(opt => opt.classList.remove('selected')); // Remove previous selection
      option.classList.add('selected'); // Add selected class to the clicked option
    });
  });

  // Expose the function to open the popup if needed
  return {
    showLabelPopup
  };
}
