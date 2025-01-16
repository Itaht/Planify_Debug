import { DiscordSDK } from "@discord/embedded-app-sdk";
import { Sidebar } from "./sidebar.js";
import "./style.css";
import "./sidebar.css";

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
  document.querySelector("#app").innerHTML = Sidebar(user);

  // Elements for Main Popup
  const createBoardButton = document.getElementById("create-board-button");
  const popupOverlay = document.getElementById("popup-overlay");
  const closePopupButton = document.getElementById("close-popup-button");
  const cancelButton = document.getElementById("cancel-button");
  const createBoardForm = document.getElementById("create-board-form");

  // Elements for Project Popup
  const createProjectButton = document.getElementById("create-project-button");
  const projectPopupOverlay = document.getElementById("project-popup-overlay");
  const closeProjectPopupButton = document.getElementById("close-project-popup-button");
  const cancelProjectButton = document.getElementById("cancel-project-button");
  const createProjectForm = document.getElementById("create-project-form");

  // Confirmation Popup Elements
  const confirmationPopup = document.getElementById("confirmation-popup");
  const cancelDiscardButton = document.getElementById("cancel-discard-button");
  const discardButton = document.getElementById("discard-button");

  // Make the entire hover area of #tasks-checkbox clickable
  const tasksCheckbox = document.getElementById("tasks-checkbox");
  const tasksCheckboxInput = document.getElementById("tasks-checkbox-input");

  tasksCheckbox.addEventListener("click", (event) => {
    // Toggle the checkbox state
    tasksCheckboxInput.checked = !tasksCheckboxInput.checked;
  });

  // Prevent the default behavior of the input itself
  tasksCheckboxInput.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Functions to show/hide confirmation popup
  function showConfirmationPopup() {
    confirmationPopup.classList.remove("hidden");
  }

  function hideConfirmationPopup() {
    confirmationPopup.classList.add("hidden");
  }

  // Main Popup Event Listeners
  createBoardButton.addEventListener("click", () => {
    popupOverlay.classList.remove("hidden");
  });

  closePopupButton.addEventListener("click", showConfirmationPopup);
  cancelButton.addEventListener("click", showConfirmationPopup);

  // Project Popup Event Listeners
  createProjectButton.addEventListener("click", () => {
    projectPopupOverlay.classList.remove("hidden");
  });

  closeProjectPopupButton.addEventListener("click", showConfirmationPopup);
  cancelProjectButton.addEventListener("click", showConfirmationPopup);

  // Discard Button Event Listener
  discardButton.addEventListener("click", () => {
    hideConfirmationPopup();

    // Close the Main Popup if it's open
    if (!popupOverlay.classList.contains("hidden")) {
      popupOverlay.classList.add("hidden");
      clearBoardFormFields();
    }

    // Close the Project Popup if it's open
    if (!projectPopupOverlay.classList.contains("hidden")) {
      projectPopupOverlay.classList.add("hidden");
      clearProjectFormFields();
    }
  });

  // Cancel Discard Button Event Listener
  cancelDiscardButton.addEventListener("click", hideConfirmationPopup);

  // Close the main popup when clicking outside
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.add("hidden");
    }
  });

  // Close the project popup when clicking outside
  projectPopupOverlay.addEventListener("click", (e) => {
    if (e.target === projectPopupOverlay) {
      projectPopupOverlay.classList.add("hidden");
    }
  });

  // Toggle visibility between board-section and project-section
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

  // Function to clear all input fields in the board form
  function clearBoardFormFields() {
    createBoardForm.reset();
  }

  // Function to clear all input fields in the project form
  function clearProjectFormFields() {
    createProjectForm.reset();
  }
}

setupDiscordSdk().catch(console.error);
