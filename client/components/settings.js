export function SettingsPopup() {
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
}