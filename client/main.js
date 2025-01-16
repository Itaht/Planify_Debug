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

  // Confirmation Popup Logic
  const confirmationPopup = document.getElementById("confirmation-popup");
  const cancelDiscardButton = document.getElementById("cancel-discard-button");
  const discardButton = document.getElementById("discard-button");

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
  });

  cancelDiscardButton.addEventListener("click", hideConfirmationPopup);

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

  // Utility functions
  function clearBoardFormFields() {
    createBoardForm.reset();
  }

  function clearProjectFormFields() {
    createProjectForm.reset();
  }

  function showConfirmationPopup() {
    confirmationPopup.classList.remove("hidden");
  }

  function hideConfirmationPopup() {
    confirmationPopup.classList.add("hidden");
  }
}

setupDiscordSdk().catch(console.error);
