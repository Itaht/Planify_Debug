export function ProjectPopup() {
    const projectPopupOverlay = document.querySelector('#project-popup-overlay');
    const createProjectButton = document.querySelector('#create-project-button');
    const closeProjectPopupButton = document.querySelector('#close-project-popup-button');
    const createProjectForm = document.querySelector('#create-project-form');
    
    // Event listener to show the project popup when the "Create Project" button is clicked
    createProjectButton.addEventListener('click', function () {
      projectPopupOverlay.classList.remove('hidden');
    });
    
    // Event listener for the close button to hide the project popup
    closeProjectPopupButton.addEventListener('click', function () {
      projectPopupOverlay.classList.add('hidden');
      createProjectForm.reset();  // Optionally reset the form fields
    });
    
    // Function to show the project popup (you can call this if needed)
    function showProjectPopup() {
      projectPopupOverlay.classList.remove('hidden');
    }
  
    // Event listener to close the popup if clicked outside
    projectPopupOverlay.addEventListener('click', function (event) {
      if (event.target === projectPopupOverlay) {
        projectPopupOverlay.classList.add('hidden');
        createProjectForm.reset();  // Optionally reset the form fields if clicking outside
      }
    });
    
    // Expose the showProjectPopup function if you need to call it from elsewhere
    return {
      showProjectPopup
    };
  }
  