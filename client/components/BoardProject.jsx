import React, { useState } from 'react';
import '/styles/project.css';
import '/styles/sidebar.css';
import '/styles/board.css';
import Board from './Board';
import ProjectPopup from './ProjectPopup';

const BoardProject = () => {
  const [isBoardVisible, setIsBoardVisible] = useState(true); // Toggle between Board and Project
  const [selectedProject, setSelectedProject] = useState({ name: 'Project Name', description: 'Project Description' }); // Selected project state

  const toggleSection = () => {
    setIsBoardVisible((prev) => !prev);
  };

  return (
    <div id="main-container">
      {/* Project Box */}
      <div id="project-container" className="clickable" onClick={toggleSection}>
        <div id="project-box" className="projectbox">
          <div id="project-box-name">{selectedProject.name}</div>
          <div id="project-box-description">{selectedProject.description}</div>
        </div>
      </div>

      {/* Conditionally Render Board or ProjectPopup */}
      {isBoardVisible ? (
        <Board />
      ) : (
        <ProjectPopup setSelectedProject={setSelectedProject} />
      )}
    </div>
  );
};

export default BoardProject;
