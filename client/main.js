import { DiscordSDK } from "@discord/embedded-app-sdk";
import { Interface } from "./interface.js";
import "./style.css";
import "./interface.css";

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

let user = {};

// Setup the Discord SDK
async function setupDiscordSdk() {
  await discordSdk.ready();
  console.log("Discord SDK is ready");

  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: ["identify", "guilds", "applications.commands"],
  });

  const response = await fetch("/.proxy/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  const { access_token } = await response.json();

  await discordSdk.commands.authenticate({ access_token });

  const userProfile = await fetchUserProfile(access_token);
  user = {
    username: userProfile.username,
    avatarUrl: `https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}.png`,
  };

  renderApp();
}

async function fetchUserProfile(token) {
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return await response.json();
}

function renderApp() {
  document.querySelector("#app").innerHTML = Interface(user);

  // Add File Button Logic
  const addFileButton = document.getElementById("add-file-button");

  // Create a hidden file input
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none"; // Hide the file input

  // Add event listener to the button
  addFileButton.addEventListener("click", () => {
    fileInput.click(); // Trigger the file input dialog
  });

  // Handle file selection
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log("Selected file:", file.name);

      // Create a file display container
      const fileDisplay = document.createElement("div");
      fileDisplay.classList.add("file-display");
      fileDisplay.textContent = file.name;

      // Create a remove button (X)
      const removeButton = document.createElement("button");
      removeButton.textContent = "X";
      removeButton.classList.add("remove-file-button");
      removeButton.addEventListener("click", () => {
        // Restore the 'add-file-button'
        fileDisplay.replaceWith(addFileButton);
      });

      // Append the remove button to the file display
      fileDisplay.appendChild(removeButton);

      // Replace the button with the file display
      addFileButton.replaceWith(fileDisplay);
    }
  });

  // Append the file input to the document
  document.body.appendChild(fileInput);
  
  // Settings Popup Logic
  const settingsIcon = document.getElementById("settings-icon");
  const settingsPopup = document.getElementById("settings-popup");

  settingsIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    settingsPopup.style.display =
      settingsPopup.style.display === "none" || settingsPopup.style.display === "" ? "flex" : "none";
  });

  document.addEventListener("click", (event) => {
    if (!settingsIcon.contains(event.target) && !settingsPopup.contains(event.target)) {
      settingsPopup.style.display = "none";
    }
  });

// Add List Button Logic
const addListButton = document.getElementById("add-list-button");
const listContainer = document.getElementById("list-container");

let listCount = 0; // Keeps track of the number of lists
const initialPosition = 27; // Initial position of the 'add-list-button' (in vw)
const offset = 314; // Offset for positioning lists (in px)

// Function to update the position of the 'add-list-button'
function updateAddListButtonPosition() {
  addListButton.style.left = `calc(${initialPosition}vw + ${listCount * offset}px)`;
}

// Function to handle replacing 'add-list-button' with 'create-new-list'
addListButton.addEventListener("click", () => {
  // Hide the 'add-list-button'
  addListButton.style.display = "none";

  // Create the 'create-new-list' box
  const createNewListBox = document.createElement("div");
  createNewListBox.classList.add("create-new-list");

  // Input field for list name
  const listInput = document.createElement("input");
  listInput.type = "text";
  listInput.placeholder = "Enter list name...";
  listInput.classList.add("add-list-input");

  // Button container for cancel and confirm buttons
  const buttonRow = document.createElement("div");
  buttonRow.classList.add("button-row");

  // Cancel button
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "cancel";
  cancelButton.classList.add("cancel-list-button");
  cancelButton.addEventListener("click", () => {
    // Remove the 'create-new-list' box
    createNewListBox.remove();
    // Show the 'add-list-button'
    addListButton.style.display = "block";
  });

  // Confirm button
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "confirm";
  confirmButton.classList.add("confirm-list-button");
  confirmButton.addEventListener("click", () => {
    const listName = listInput.value.trim(); // Get the entered name
    if (listName) {
      // Create a new list with the entered name
      const newList = { id: Date.now(), title: listName };
      renderList(newList, listContainer);

      // Update the list count and button position
      listCount++;
      updateAddListButtonPosition();

      // Remove the 'create-new-list' box
      createNewListBox.remove();
      // Show the 'add-list-button'
      addListButton.style.display = "block";
    }
  });

  // Append buttons to the button row container
  buttonRow.appendChild(cancelButton);
  buttonRow.appendChild(confirmButton);

  // Append input and button row to the 'create-new-list' box
  createNewListBox.appendChild(listInput);
  createNewListBox.appendChild(buttonRow);

  // Insert the 'create-new-list' box into the container
  listContainer.appendChild(createNewListBox);
});


// Function to render a new list
function renderList(listData, container) {
  const list = document.createElement("div");
  list.classList.add("list");
  list.setAttribute("data-list-id", listData.id);

  // Add list title
  const title = document.createElement("span");
  title.classList.add("list-title");
  title.textContent = listData.title;
  list.appendChild(title);

  // Add delete button to remove the list
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete List";
  deleteButton.classList.add("delete-list-button");
  deleteButton.addEventListener("click", () => {
    list.remove();
    listCount--;
    updateAddListButtonPosition(); // Adjust position of the 'add-list-button'
  });
  list.appendChild(deleteButton);

  // Add "Add Task" button to the list
  const addTaskButton = document.createElement("button");
  addTaskButton.classList.add("add-task-button");
  addTaskButton.textContent = "+ Add Task";
  addTaskButton.addEventListener("click", () => {
    alert(`Add Task to List: ${listData.title}`); // Example functionality
  });
  list.appendChild(addTaskButton);

  // Append the new list to the container
  container.appendChild(list);
  attachTaskPopupLogic();
}

// Ensure the 'add-list-button' starts in the correct position
updateAddListButtonPosition();


  // Handle edit and delete actions in the settings popup
  const editBoard = document.getElementById("edit-board");
  const deleteBoard = document.getElementById("delete-board");

  editBoard.addEventListener("click", () => {
    alert("Edit board functionality coming soon!");
  });

  deleteBoard.addEventListener("click", () => {
    alert("Delete board functionality coming soon!");
  });

    // Tasks Checkbox Logic 
    const tasksCheckbox = document.getElementById("tasks-checkbox");
    const tasksCheckboxInput = document.getElementById("tasks-checkbox-input");
  
    tasksCheckbox.addEventListener("click", () => {
      tasksCheckboxInput.checked = !tasksCheckboxInput.checked;
    });
  
    tasksCheckboxInput.addEventListener("click", (event) => {
      event.stopPropagation();
    });

  // Main Popup Logic
  const createBoardButton = document.getElementById("create-board-button");
  const popupOverlay = document.getElementById("popup-overlay");
  const closePopupButton = document.getElementById("close-popup-button");
  const cancelButton = document.getElementById("cancel-button");
  const createBoardForm = document.getElementById("create-board-form");

  createBoardButton.addEventListener("click", () => {
    popupOverlay.classList.remove("hidden");
  });

  closePopupButton.addEventListener("click", showConfirmationPopup);
  cancelButton.addEventListener("click", showConfirmationPopup);

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.add("hidden");
      clearBoardFormFields();
    }
  });

  // Project Popup Logic
  const createProjectButton = document.getElementById("create-project-button");
  const projectPopupOverlay = document.getElementById("project-popup-overlay");
  const closeProjectPopupButton = document.getElementById("close-project-popup-button");
  const cancelProjectButton = document.getElementById("cancel-project-button");
  const createProjectForm = document.getElementById("create-project-form");

  createProjectButton.addEventListener("click", () => {
    projectPopupOverlay.classList.remove("hidden");
  });

  closeProjectPopupButton.addEventListener("click", showConfirmationPopup);
  cancelProjectButton.addEventListener("click", showConfirmationPopup);

  projectPopupOverlay.addEventListener("click", (e) => {
    if (e.target === projectPopupOverlay) {
      projectPopupOverlay.classList.add("hidden");
      clearProjectFormFields();
    }
  });

  function attachTaskPopupLogic() {
    const taskPopupOverlay = document.getElementById("task-popup-overlay");
    const closeTaskPopupButton = document.getElementById("close-task-popup-button");
    const cancelTaskButton = document.getElementById("cancel-task-button");
    const addTaskForm = document.getElementById("add-task-form");
    const confirmationPopup = document.getElementById("confirmation-popup");
  
    // Show Task Popup
    document.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("add-task-button")) {
        taskPopupOverlay.classList.remove("hidden");
      }
    });
  
    // Show Confirmation Popup on Close or Cancel Button Click
    closeTaskPopupButton.addEventListener("click", () => {
      showConfirmationPopup();
    });
  
    cancelTaskButton.addEventListener("click", () => {
      showConfirmationPopup();
    });
  
    // Close Task Popup by Clicking on Overlay
    taskPopupOverlay.addEventListener("click", (e) => {
      if (e.target === taskPopupOverlay) {
        taskPopupOverlay.classList.add("hidden");
        clearTaskFormFields();
      }
    });
  
    // Discard Task Popup Changes
    const discardButton = document.getElementById("discard-button");
    discardButton.addEventListener("click", () => {
      hideConfirmationPopup();
      taskPopupOverlay.classList.add("hidden");
      clearTaskFormFields();
    });
  
    // Cancel Discard
    const cancelDiscardButton = document.getElementById("cancel-discard-button");
    cancelDiscardButton.addEventListener("click", hideConfirmationPopup);
  
    // Clear Task Form Fields
    function clearTaskFormFields() {
      addTaskForm.reset();
    }
  
    // Show Confirmation Popup
    function showConfirmationPopup() {
      confirmationPopup.classList.remove("hidden");
    }
  
    // Hide Confirmation Popup
    function hideConfirmationPopup() {
      confirmationPopup.classList.add("hidden");
    }
  }
  
  

// Confirmation Popup Logic
const confirmationPopup = document.getElementById("confirmation-popup");
const cancelDiscardButton = document.getElementById("cancel-discard-button");
const discardButton = document.getElementById("discard-button");

// Close Confirmation Popup when clicking the overlay
confirmationPopup.addEventListener("click", (e) => {
  if (e.target === confirmationPopup) {
    hideConfirmationPopup();
  }
});

// Discard Changes
discardButton.addEventListener("click", () => {
  hideConfirmationPopup();

  if (!popupOverlay.classList.contains("hidden")) {
    popupOverlay.classList.add("hidden");
    clearBoardFormFields();
  }

  if (!projectPopupOverlay.classList.contains("hidden")) {
    projectPopupOverlay.classList.add("hidden");
    clearProjectFormFields();
  }

  if (!taskPopupOverlay.classList.contains("hidden")) {
    taskPopupOverlay.classList.add("hidden");
    clearTaskFormFields();
  }
});

// Cancel Discard
cancelDiscardButton.addEventListener("click", hideConfirmationPopup);

// Utility Function to Hide Confirmation Popup
function hideConfirmationPopup() {
  confirmationPopup.classList.add("hidden");
}

 const projectBox = document.getElementById("projectbox");
 const boardSection = document.getElementById("board-section");
 const projectSection = document.getElementById("project-section");

 projectBox.addEventListener("click", () => {
   if (boardSection.style.display === "none") {
     boardSection.style.display = "block";
     projectSection.style.display = "none";
   } else {
     boardSection.style.display = "none";
     projectSection.style.display = "block";
   }
 });

  // Utility functions
  function clearBoardFormFields() {
    createBoardForm.reset();
  }

  function clearProjectFormFields() {
    createProjectForm.reset();
  }

  function clearTaskFormFields() {
    addTaskForm.reset();
  }

  function showConfirmationPopup() {
    confirmationPopup.classList.remove("hidden");
  }

  function hideConfirmationPopup() {
    confirmationPopup.classList.add("hidden");
  }
}

setupDiscordSdk().catch(console.error);
