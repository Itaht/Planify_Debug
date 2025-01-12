export function Sidebar(user) {
    return `
      <div id="sidebar">
        <div id="logo">
        </div>
        <div id="userbox">
          <img src="${user.avatarUrl}" alt="Profile Picture" id="profile-pic">
          <span id="username">${user.username}</span>
        </div>
        <div id="projectbox">
        </div>
      </div>
    `;
  }
  