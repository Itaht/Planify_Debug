export function Interface(user,member) {
  return `
    <div class="file-display">
      <span class="file-name">very_long_file_name_example.txt</span>
      <button class="remove-file-button">X</button>
    </div>

    <div id="calendar-container" class="hidden">
      <div id="calendar">
        <div class="calendar-header">
          <button id="prev-month-button">←</button>
          <span id="month-year-display"></span>
          <button id="next-month-button">→</button>
        </div>
        <div class="calendar-grid">
          <div class="weekday">Sun</div>
          <div class="weekday">Mon</div>
          <div class="weekday">Tue</div>
          <div class="weekday">Wed</div>
          <div class="weekday">Thu</div>
          <div class="weekday">Fri</div>
          <div class="weekday">Sat</div>
        </div>
        <div class="calendar-days"></div>
      </div>
    </div>

    <!-- Add List Button -->
    <button id="add-list-button">+ add a list</button>

    <!-- List Container -->
    <div id="list-container"></div>

    <div id="board-page">

      <!-- Board Topic -->
      <div id="board-topic"></div>
      
      <!-- Board Description -->
      <div id="board-topic-description"></div>
      
      <!-- Settings Icon -->
      <div id="settings-icon">
        <img src="assets/setting.svg" alt="Settings">
      </div>
      
      <!-- Tasks Checkbox -->
      <div id="tasks-checkbox">
        <input type="checkbox" id="tasks-checkbox-input">
        <label for="tasks-checkbox-input">tasks assigned to me</label>
      </div>

      <div id="sidebar">
        <div id="logo"></div>
        <div id="userbox">
          <img src="${user.avatarUrl}" alt="Profile Picture" id="profile-pic">
          <span id="username">${user.username}</span>
        </div>

        <!-- Project Box -->
        <div id="projectbox" class="clickable">
          <div id="projectname">Project 1</div>
        </div>

        <!-- Settings Popup -->
        <div id="settings-popup">
          <p id="edit-board">edit board</p>
          <p id="delete-board" class="delete">delete board</p>
        </div>

        <!-- Board Section -->
        <div id="board-section">
          <span id="board-text">Boards</span>
          <div id="create-board-container">
            <button id="create-board-button">+ Create New Board</button>
          </div>
          <div id="board-list-container"></div> <!-- Separate container for boards -->
        </div>

        <!-- Project Section -->
        <div id="project-section">
          <button id="create-project-button">+ create new project</button>
          <div id="line-under-button"></div>
          <div id="project-list-container"></div>
        </div>

        <!-- Main Popup and Overlay -->
        <div id="popup-overlay" class="hidden">
          <div id="popup-content">
            <div class="popup-header">
              <div id="header-title">Create new board</div>
              <button id="close-popup-button">✖</button>
            </div>
            <div id="popup-body-main">
              <form id="create-board-form">
                <label for="board-name">board name</label>
                <input type="text" id="board-name" placeholder="Enter board name" required>
                <label for="board-description">board description (optional)</label>
                <textarea id="input-board-description" placeholder="Enter board description"></textarea>
              </form>
            </div>
            <div class="popup-buttons">
              <button type="button" id="cancel-button">cancel</button>
              <button type="submit" id="create-board-button-form">create board</button>
            </div>
          </div>
        </div>

        <!-- Project Popup and Overlay -->
        <div id="project-popup-overlay" class="hidden">
          <div id="popup-content">
            <div class="popup-header">
              <div id="header-title">Create new project</div>
              <button id="close-project-popup-button">✖</button>
            </div>
            <div id="popup-body-main">
              <form id="create-project-form">
                <label for="project-name">project name</label>
                <input type="text" id="project-name" placeholder="Enter project name" required>
                <label for="project-description">project description (optional)</label>
                <textarea id="project-description" placeholder="Enter project description"></textarea>
              </form>
            </div>
            <div class="popup-buttons">
              <button type="button" id="cancel-project-button">cancel</button>
              <button type="submit" id="create-project-button-form">create project</button>
            </div>
          </div>
        </div>

        <!-- Task Popup and Overlay -->
        <div id="task-popup-overlay" class="hidden">
          <div id="task-popup-content">
            <div class="popup-header">
              <div id="header-title">Add a task</div>
              <button id="close-task-popup-button">✖</button>
            </div>
            <div id="popup-body">
              <form id="add-task-form">
                <label for="task-name">task name</label>
                <input type="text" id="task-name" placeholder="Enter task name" required>
                <label for="task-details">task description (optional)</label>
                <textarea id="task-details" placeholder="Enter task description"></textarea>
                <label for="attached-file">attached file</label>
                <div id="file-container">
                  <button id="add-file-button" type="button">+ add file</button>
                </div>
                <div class="date-inputs">
                  <div>
                    <label for="start-date">start date</label>
                    <button id="start-date-button" type="button">dd/mm/yy</button>
                  </div>
                  <div>
                    <label for="due-date">due date</label>
                    <button id="due-date-button" type="button">dd/mm/yy</button>
                  </div>
                </div>
                <div class="label-task">
                  <div>
                    <label for="label">label</label>
                    <button id="set-label-button" type="button">set label</button>
                  </div>
                  <div>
                    <label for="task-assigned-to">task assigned to</label>
                    <button id="add-member-button" type="button">+ add member</button>
                  </div>
                </div>
                <div class="reminder">
                  <label for="reminder">set reminder</label>
                  <div class="reminder-inputs">
                    <span>remind every</span>
                    <input type="text" id="reminder" placeholder="dd">
                    <span>day</span>
                  </div>
                </div>
              </form>
            </div>
            <div class="popup-buttons">
              <button type="button" id="cancel-task-button">cancel</button>
              <button type="submit" id="add-task-button-submit">add a task</button>
            </div>
          </div>
        </div>

        <div id="label-popup" class="hidden">
          <div class="popup-content">
            <div class="label-options">
              <button class="label-option" style="background-color: #A259FF;" data-color="#A259FF"></button>
              <button class="label-option" style="background-color: #FFD93D;" data-color="#FFD93D"></button>
              <button class="label-option" style="background-color: #53D1F0;" data-color="#53D1F0"></button>
              <button class="label-option" style="background-color: #FF773D;" data-color="#FF773D"></button>
              <button class="label-option" style="background-color: #3D8BFF;" data-color="#3D8BFF"></button>
              <button class="label-option" style="background-color: #FF3D71;" data-color="#FF3D71"></button>
              <button class="label-option" style="background-color: #3DFF77;" data-color="#3DFF77"></button>
              <button id="done-label-button" class="done-button">done</button>
            </div>
          </div>
        </div>

        <div id="member-popup" class="hidden">
            <div class="member-options"></div>
            <button id="done-member-button">Done</button>
        </div>
        <button id="add-member-button">+ Add Member</button>

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

