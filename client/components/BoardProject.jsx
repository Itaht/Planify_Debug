import React, { useState } from 'react';
import '/styles/project.css';
import '/styles/sidebar.css';
import '/styles/board.css';
import BoardSection from './BoardSection';
import ProjectSection from './ProjectSection';

const BoardProject = () => {
  const [isBoardVisible, setIsBoardVisible] = useState(true);
  const [selectedProject, setSelectedProject] = useState({
    id: null,
    name: 'Project Name',
    description: 'Project Description',
  });

  const toggleSection = () => {
    setIsBoardVisible((prev) => !prev);
  };

  return (
    <div id="main-container">
      {/* Project Box */}
      <div id="project-container" className="clickable" onClick={toggleSection}>
        <div id={`project-box-${selectedProject.id}`} className="projectbox">
          <div id="project-box-name">{selectedProject.name}</div>
          <div id="project-box-description">{selectedProject.description}</div>
        </div>
      </div>

      {/* Conditionally Render Board or ProjectPopup */}
      {isBoardVisible ? (
        <BoardSection />
      ) : (
        <ProjectSection setSelectedProject={setSelectedProject} />
      )}
    </div>
  );
};

export default BoardProject;
