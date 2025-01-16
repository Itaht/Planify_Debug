export function Sidebar(user) {
  return `
    <div id="sidebar">
      <div id="logo"></div>
      <div id="board-topic">board 1</div>
      <div id="board-description">board description</div>
      <div id="userbox">
        <img src="${user.avatarUrl}" alt="Profile Picture" id="profile-pic">
        <span id="username">${user.username}</span>
      </div>

      <!-- Project Box -->
      <div id="projectbox" class="clickable">
        <div id="projectmain">Project 1</div>
      </div>

      <!-- Settings Icon -->
<div id="settings-icon" onclick="toggleSettingsPopup()">
  <img src="assets/setting.svg" alt="Settings">
</div>

<!-- Settings Popup -->
<div id="settings-popup">
  <p id="edit-board">edit board</p>
  <p id="delete-board" class="delete">delete board</p>
</div>

      <!-- Board Section -->
      <div id="board-section">
        <span id="board-text">Boards</span>
        <button id="create-board-button">+ Create New Board</button>
      </div>

      <!-- Project Section -->
      <div id="project-section">
        <button id="create-project-button">+ create new project</button>
        <div id="line-under-button"></div>
      </div>

     <!-- Checkbox for Tasks -->
<div id="tasks-checkbox">
  <input type="checkbox" id="tasks-checkbox-input">
  <label id="tasks-checkbox-label">tasks assigned to me</label>
</div>

      <!-- Main Popup and Overlay -->
      <div id="popup-overlay" class="hidden">
        <div id="popup-content">
          <div class="popup-header">
            <h2>Create new board</h2>
            <button id="close-popup-button">✖</button>
          </div>
          <form id="create-board-form">
            <label for="board-name">board name</label>
            <input type="text" id="board-name" placeholder="Enter board name" required>
            <label for="board-description">board description (optional)</label>
            <textarea id="input-board-description" placeholder="Enter board description"></textarea>
            <div class="popup-buttons">
              <button type="button" id="cancel-button">cancel</button>
              <button type="submit" id="create-board-button-form">create board</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Project Popup and Overlay -->
      <div id="project-popup-overlay" class="hidden">
        <div id="popup-content">
          <div class="popup-header">
            <h2>Create new project</h2>
            <button id="close-project-popup-button">✖</button>
          </div>
          <form id="create-project-form">
            <label for="project-name">project name</label>
            <input type="text" id="project-name" placeholder="Enter project name" required>
            <label for="project-description">project description (optional)</label>
            <textarea id="project-description" placeholder="Enter project description"></textarea>
            <div class="popup-buttons">
              <button type="button" id="cancel-project-button">cancel</button>
              <button type="submit" id="create-project-button-form">create project</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Confirmation Popup -->
      <div id="confirmation-popup" class="hidden">
        <div id="confirmation-content">
          <h3>Discard changes?</h3>
          <p>If you go back now, you will lose any changes you’ve made.</p>
          <div class="confirmation-buttons">
            <button id="cancel-discard-button">Cancel</button>
            <button id="discard-button" class="discard">Discard</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
