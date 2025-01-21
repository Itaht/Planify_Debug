import { DiscordSDK } from "@discord/embedded-app-sdk";
import { Interface } from './components/interface.js';
import { Calendar } from './components/calendar.js';
import { Task } from './components/task.js';
import { Board } from './components/board.js';
import { SettingsPopup } from './components/settings.js';
import { ProjectPopup } from './components/projectPopup.js';
import { ConfirmationPopup } from './components/confirmationPopup.js';
import { TaskLabel } from './components/taskLabel.js';


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
  
    // Initialize the calendar
    Calendar();

    // Initialize the task management system
    Task();

    // Initialize the board functionalities
    Board();

    // Initialize settings popup and actions
    SettingsPopup();

    // Initialize the project popup
    ProjectPopup();

    // Initialize confirmation popup
    ConfirmationPopup();

    // Initialize task label management
    TaskLabel();
}

// Initialize the Discord SDK
setupDiscordSdk().catch(console.error);
