export function Sidebar(user) {
  return `
    <div id="sidebar">
      <div id="logo"></div>
      <div id="userbox">
        <img src="${user.avatarUrl}" alt="Profile Picture" id="profile-pic">
        <span id="username">${user.username}</span>
      </div>
      <div id="projectbox" class="clickable">Projects</div>

      <!-- Board Section -->
      <div id="board-section">
        <span id="board-text">Boards</span>
        <button id="create-board-button">+ Create New Board</button>
      </div>

      <!-- Project Section -->
      <div id="project-section">
        <span id="project-text">Projects</span>
        <button id="create-project-button">+ Create New Project</button>
      </div>
    </div>

    <!-- Checkbox for Tasks -->
    <div id="tasks-checkbox">
      <label id="tasks-checkbox">
  <input type="checkbox" id="tasks-checkbox-input">
  tasks assigned to me
</label>

    </div>

    <!-- Main Popup and Overlay -->
    <div id="popup-overlay" class="hidden">
      <div id="popup-content">
        <div class="popup-header">
          <h2>Create new board</h2>
          <button id="close-popup-button">✖</button>
        </div>
        <form id="create-board-form">
          <label for="board-name">Board Name</label>
          <input type="text" id="board-name" placeholder="Enter board name" required />

          <label for="board-description">Board Description (optional)</label>
          <textarea id="board-description" placeholder="Enter board description"></textarea>

          <div class="popup-buttons">
            <button type="button" id="cancel-button">Cancel</button>
            <button type="submit" id="create-board-button-form">Create Board</button>
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
  `;
}
