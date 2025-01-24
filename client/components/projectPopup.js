import { ConfirmationPopup } from './confirmationPopup.js';

export function ProjectPopup() {
  const projectListContainer = document.getElementById("project-list-container");
  const createProjectButton = document.getElementById("create-project-button");
  const createProjectButtonForm = document.getElementById("create-project-button-form");
  const projectPopupOverlay = document.getElementById("project-popup-overlay");
  const closeProjectPopupButton = document.getElementById("close-project-popup-button");
  const cancelProjectButton = document.getElementById("cancel-project-button");
  const projectNameInput = document.getElementById("project-name");
  const projectDescriptionInput = document.getElementById("project-description");
  const projectNameDisplay = document.getElementById("projectname"); // Display area for project name
  const projectDescriptionDisplay = document.getElementById("projectdescription"); // Display area for project description
  const { showConfirmationPopup, hideConfirmationPopup } = ConfirmationPopup();

  // Function to reset and hide the project popup overlay
  function resetProjectPopupOverlay() {
    projectPopupOverlay.classList.add("hidden");
    projectNameInput.value = ""; // Clear the input field
    projectDescriptionInput.value = ""; // Clear the description field
  }

  // Function to handle the confirmation logic
  function handleConfirmation(action) {
    if (action === "discard") {
      resetProjectPopupOverlay();
    }
    hideConfirmationPopup();
  }

  // Attach event listeners to confirmation popup buttons
  document.getElementById("cancel-discard-button").addEventListener("click", () => {
    hideConfirmationPopup();
  });

  document.getElementById("discard-button").addEventListener("click", () => {
    handleConfirmation("discard");
  });

  // Show the project popup
  function showProjectPopup() {
    projectPopupOverlay.classList.remove("hidden");
  }

  // Function to dynamically position the line
  function createOrUpdateDynamicLine() {
    const projectSection = document.getElementById("project-section");
    let dynamicLine = document.querySelector(".dynamic-line");

    if (!dynamicLine) {
      dynamicLine = document.createElement("div");
      dynamicLine.className = "dynamic-line";
      projectSection.appendChild(dynamicLine);
    }

    const lastProjectButton = projectListContainer.querySelector(".project-button:last-child");
    if (lastProjectButton) {
      const lastButtonRect = lastProjectButton.getBoundingClientRect();
      const projectSectionRect = projectSection.getBoundingClientRect();
      const offsetVh = ((lastButtonRect.bottom - projectSectionRect.top) / window.innerHeight) * 100;
      dynamicLine.style.top = `calc(${offsetVh}vh + 2.5vh)`; // Adjust for spacing
      dynamicLine.style.left = "0";
      dynamicLine.style.width = "100%";
      dynamicLine.style.display = "block";
    } else {
      dynamicLine.style.display = "none"; // Hide if no projects
    }
  }

  // Handle creating a new project button
  function handleCreateProject(event) {
    event.preventDefault();

    const projectName = projectNameInput.value.trim();
    const projectDescription = projectDescriptionInput.value.trim();
    if (projectName) {
      const newProjectButton = document.createElement("button");
      newProjectButton.className = "project-button";
      newProjectButton.innerHTML = `
        <span class="checkmark hidden">✓</span>
        <span class="project-name">${projectName}</span>
      `;

      // Store the project description as a data attribute (hidden)
      newProjectButton.dataset.description = projectDescription;

      // Add event listener to select the project and update projectbox
      newProjectButton.addEventListener("click", () => {
        document.querySelectorAll(".project-button").forEach((btn) => {
          btn.classList.remove("active");
          btn.querySelector(".checkmark").classList.add("hidden");
        });
        newProjectButton.classList.add("active");
        newProjectButton.querySelector(".checkmark").classList.remove("hidden");

        // Update the projectbox with the selected project's name and description
        projectNameDisplay.textContent = projectName;
        projectDescriptionDisplay.textContent = projectDescription || "No description.";
      });

      projectListContainer.appendChild(newProjectButton);
      resetProjectPopupOverlay();
      createOrUpdateDynamicLine();
    } else {
      alert("Please enter a project name.");
    }
  }

  // Show confirmation popup for specific actions
  function showConfirmationOnAction(event) {
    event.stopPropagation();
    showConfirmationPopup();
  }

  // Add event listeners
  createProjectButton.addEventListener("click", showProjectPopup);
  createProjectButtonForm.addEventListener("click", handleCreateProject);
  closeProjectPopupButton.addEventListener("click", showConfirmationOnAction);
  cancelProjectButton.addEventListener("click", showConfirmationOnAction);

  projectPopupOverlay.addEventListener("click", (event) => {
    if (event.target === projectPopupOverlay) {
      showConfirmationPopup();
    }
  });

  // Optional: Handle dynamic line updates on window resize
  window.addEventListener("resize", createOrUpdateDynamicLine);
}
