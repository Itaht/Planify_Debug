export function BoardProject() {
  const projectBox = document.getElementById("projectbox");
  const projectListContainer = document.getElementById("project-list-container");
  const boardSection = document.getElementById("board-section");
  const projectSection = document.getElementById("project-section");
  const projectNameDisplay = document.getElementById("projectname");
  const projectDescriptionDisplay = document.getElementById("projectdescription");

  // Default text for project name and description
  const defaultProjectName = "No Project Selected";
  const defaultProjectDescription = "No description.";

  // Create and add the triangle symbol
  const triangleSymbol = document.createElement("div");
  triangleSymbol.id = "triangle-symbol";
  triangleSymbol.classList.add("triangle-right"); // Default direction
  projectBox.prepend(triangleSymbol);

  // Create and add the project settings icon
  const projectSettingsIcon = document.createElement("img");
  projectSettingsIcon.id = "project-settings-icon";
  projectSettingsIcon.src = "assets/setting.svg"; // Path to your settings.svg
  projectSettingsIcon.alt = "Project Settings";
  projectSettingsIcon.classList.add("project-settings-icon");
  projectBox.appendChild(projectSettingsIcon);

  // Create the project settings popup
  const projectSettingsPopup = document.createElement("div");
  projectSettingsPopup.id = "project-settings-popup";
  projectSettingsPopup.classList.add("hidden", "project-settings-popup");
  projectSettingsPopup.innerHTML = `
    <p class="project-settings-option" id="share-project">Share Project</p>
    <p class="project-settings-option" id="edit-project">Edit Project</p>
    <p class="project-settings-option delete" id="delete-project">Delete Project</p>
  `;
  document.body.appendChild(projectSettingsPopup);

  // Position the popup near the settings icon
  function positionPopup() {
    const rect = projectSettingsIcon.getBoundingClientRect();
    projectSettingsPopup.style.top = `${rect.bottom + window.scrollY}px`;
    projectSettingsPopup.style.left = `${rect.left + window.scrollX}px`;
  }

  // Toggle the popup visibility
  projectSettingsIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click propagation
    if (projectSettingsPopup.classList.contains("hidden")) {
      document.querySelectorAll(".project-settings-popup").forEach((popup) =>
        popup.classList.add("hidden")
      );
      positionPopup();
      projectSettingsPopup.classList.remove("hidden");
    } else {
      projectSettingsPopup.classList.add("hidden");
    }
  });

  // Hide the popup when clicking outside
  document.addEventListener("click", () => {
    projectSettingsPopup.classList.add("hidden");
  });

  // Update dynamic line position
  function updateDynamicLine() {
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
      // Hide the dynamic line if no project buttons exist
      dynamicLine.style.display = "none";
    }
  }

  // Event listener for the "Delete Project" option
  projectSettingsPopup.addEventListener("click", (event) => {
    if (event.target.id === "delete-project") {
      const activeProjectButton = document.querySelector(".project-button.active");
      if (activeProjectButton) {
        activeProjectButton.remove(); // Remove the active project button
        projectSettingsPopup.classList.add("hidden"); // Hide the popup
        console.log("Project deleted.");

        // Reset project name and description to default
        projectNameDisplay.textContent = defaultProjectName;
        projectDescriptionDisplay.textContent = defaultProjectDescription;

        // Update dynamic line position
        updateDynamicLine();
      } else {
        console.log("No active project to delete.");
      }
    }
  });

  // Event listener for the "Share Project" option
  projectSettingsPopup.addEventListener("click", (event) => {
    if (event.target.id === "share-project") {
      console.log("Share Project clicked");
      // Add your logic for sharing the project here
    }
  });

  // Event listener for the "Edit Project" option
  projectSettingsPopup.addEventListener("click", (event) => {
    if (event.target.id === "edit-project") {
      console.log("Edit Project clicked");
      // Add your logic for editing the project here
    }
  });

  // Toggle between the board section and project section
  projectBox.addEventListener("click", (event) => {
    if (event.target === projectSettingsIcon) return; // Do nothing if settings icon clicked

    if (boardSection.style.display === "none") {
      boardSection.style.display = "block";
      projectSection.style.display = "none";
      triangleSymbol.classList.remove("triangle-down");
      triangleSymbol.classList.add("triangle-right");
    } else {
      boardSection.style.display = "none";
      projectSection.style.display = "block";
      triangleSymbol.classList.remove("triangle-right");
      triangleSymbol.classList.add("triangle-down");
    }
  });

  // Initial dynamic line setup
  updateDynamicLine();
}
