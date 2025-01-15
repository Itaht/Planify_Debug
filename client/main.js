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

  // Elements
  const projectBox = document.getElementById("projectbox");
  const boardSection = document.getElementById("board-section");
  const projectSection = document.getElementById("project-section");
  const createProjectButton = document.getElementById("create-project-button");

  // Popup Elements for Projects
  const projectPopupOverlay = document.getElementById("project-popup-overlay");
  const closeProjectPopupButton = document.getElementById("close-project-popup-button");

  // Initially hide the project-section
  projectSection.style.display = "none";

  // Toggle visibility between board-section and project-section
  projectBox.addEventListener("click", () => {
    if (boardSection.style.display === "none") {
      boardSection.style.display = "block";
      projectSection.style.display = "none";
    } else {
      boardSection.style.display = "none";
      projectSection.style.display = "block";
    }
  });

  // Show the project popup when the button is clicked
  createProjectButton.addEventListener("click", () => {
    projectPopupOverlay.classList.remove("hidden");
  });

  // Close the project popup when clicking outside the popup area
  projectPopupOverlay.addEventListener("click", (e) => {
    if (e.target === projectPopupOverlay) {
      projectPopupOverlay.classList.add("hidden");
      clearProjectFormFields();
    }
  });

  // Close the project popup when clicking the close button
  closeProjectPopupButton.addEventListener("click", () => {
    projectPopupOverlay.classList.add("hidden");
    clearProjectFormFields();
  });

  // Main Popup Elements
  const createBoardButton = document.getElementById("create-board-button");
  const popupOverlay = document.getElementById("popup-overlay");
  const closePopupButton = document.getElementById("close-popup-button");
  const cancelButton = document.getElementById("cancel-button");
  const createBoardForm = document.getElementById("create-board-form");

  // Confirmation Popup Elements
  const confirmationPopup = document.getElementById("confirmation-popup");
  const cancelDiscardButton = document.getElementById("cancel-discard-button");
  const discardButton = document.getElementById("discard-button");

  // Function to clear all input fields in the board form
  function clearBoardFormFields() {
    createBoardForm.reset();
  }

  // Function to clear all input fields in the project form
  function clearProjectFormFields() {
    const projectForm = document.getElementById("create-project-form");
    if (projectForm) {
      projectForm.reset();
    }
  }

  // Show the main popup
  createBoardButton.addEventListener("click", () => {
    popupOverlay.classList.remove("hidden");
  });

  // Close the main popup when clicking outside the popup area
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.add("hidden");
      clearBoardFormFields();
    }
  });

  // Show confirmation popup when cancel or close buttons are clicked
  closePopupButton.addEventListener("click", () => {
    confirmationPopup.classList.remove("hidden");
  });

  cancelButton.addEventListener("click", () => {
    confirmationPopup.classList.remove("hidden");
  });

  // Close confirmation popup when clicking the cancel button inside it
  cancelDiscardButton.addEventListener("click", () => {
    confirmationPopup.classList.add("hidden");
  });

  // Close both popups when clicking the discard button inside the confirmation popup
  discardButton.addEventListener("click", () => {
    confirmationPopup.classList.add("hidden");
    popupOverlay.classList.add("hidden");
    clearBoardFormFields();
  });

  // Close the confirmation popup when clicking outside it
  confirmationPopup.addEventListener("click", (e) => {
    if (e.target === confirmationPopup) {
      confirmationPopup.classList.add("hidden");
    }
  });
}

setupDiscordSdk().catch(console.error);
