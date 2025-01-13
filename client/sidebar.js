export function Sidebar(user) {
  return `
    <div id="sidebar">
      <div id="logo"></div>
      <div id="userbox">
        <img src="${user.avatarUrl}" alt="Profile Picture" id="profile-pic">
        <span id="username">${user.username}</span>
      </div>
      <div id="projectbox" class="clickable">Projects</div>
      <div id="board-section">
        <span id="board-text">Boards</span>
        <button id="create-board-button">+ Create New Board</button>
      </div>

    </div>
  `;
}
