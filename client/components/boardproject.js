export function BoardProject() {
  const projectBox = document.getElementById("projectbox");
  const boardSection = document.getElementById("board-section");
  const projectSection = document.getElementById("project-section");
  const triangleSymbol = document.createElement("div");
  const projectsettingsIcon = document.createElement("img");
  const projectSettingsPopup = document.createElement("div");

  // Add triangle symbol to projectBox
  triangleSymbol.id = "triangle-symbol";
  triangleSymbol.classList.add("triangle-right"); // Default direction
  projectBox.prepend(triangleSymbol);

  // Add projectsettings icon to projectBox
  projectsettingsIcon.id = "project-settings-icon";
  projectsettingsIcon.src = "assets/setting.svg"; // Path to your settings.svg
  projectsettingsIcon.alt = "Project Settings";
  projectsettingsIcon.classList.add("project-settings-icon");
  projectBox.appendChild(projectsettingsIcon);

  // Create the project settings popup
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
    const rect = projectsettingsIcon.getBoundingClientRect();
    projectSettingsPopup.style.top = `${rect.bottom + window.scrollY - 30}px`;
    projectSettingsPopup.style.left = `${rect.left + window.scrollX + 55}px`;
  }

  // Toggle popup visibility
  projectsettingsIcon.addEventListener("click", (event) => {
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

  // Hide popup when clicking elsewhere
  document.addEventListener("click", () => {
    projectSettingsPopup.classList.add("hidden");
  });

  // Add event listeners for the popup options
  document.getElementById("share-project").addEventListener("click", () => {
    console.log("Share Project clicked");
    // Add your logic for sharing the project
  });

  document.getElementById("edit-project").addEventListener("click", () => {
    console.log("Edit Project clicked");
    // Add your logic for editing the project
  });

  document.getElementById("delete-project").addEventListener("click", () => {
    console.log("Delete Project clicked");
    // Add your logic for deleting the project
  });

  // Toggle between boardSection and projectSection
  projectBox.addEventListener("click", (event) => {
    if (event.target === projectsettingsIcon) return; // Do nothing if settings icon clicked

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
}
