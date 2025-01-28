import React, { useState } from 'react';
import '/styles/project.css';
import '/styles/sidebar.css';
import '/styles/board.css';
import Board from './Board'; // Ensure it's not rendered elsewhere
import ProjectPopup from './ProjectPopup'; // Ensure it's not rendered elsewhere

const BoardProject = () => {
  const [isBoardVisible, setIsBoardVisible] = useState(true); // True = Show Board, False = Show Project

  const toggleSection = () => {
    setIsBoardVisible((prev) => !prev);
  };

  return (
    <div id="main-container">
      {/* ProjectBox: Always Visible */}
      <div id="project-container" className="clickable" onClick={toggleSection}>
        <div id="project-box" className="projectbox">
          <div id="project-box-name">Project Name</div>
          <div id="project-box-description">Click to toggle between Board and Project</div>
        </div>
      </div>

      {/* Conditionally render Board or ProjectPopup */}
      {isBoardVisible ? (
        <Board />
      ) : (
        <ProjectPopup />
      )}
    </div>
  );
};

export default BoardProject;
