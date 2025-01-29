import React, { useState, useRef, useEffect } from 'react';
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

  const [settingsVisible, setSettingsVisible] = useState(false);
  const settingsRef = useRef(null);

  // Close settings popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSection = () => {
    // Prevent toggling section if settings popup is open
    if (!settingsVisible) {
      setIsBoardVisible((prev) => !prev);
    }
  };

  return (
    <div id="main-container">
      {/* Project Box */}
      <div id="project-container" className="clickable" onClick={toggleSection}>
        <div id={`project-box-${selectedProject.id}`} className="projectbox">
          {/* Triangle Symbol */}
          <div className={`triangle-symbol ${isBoardVisible ? 'triangle-right' : 'triangle-down'}`}></div>
          
          {/* Project Text Content */}
          <div id="project-box-content">
            <div id="project-box-name">{selectedProject.name}</div>
            <div id="project-box-description">{selectedProject.description}</div>
          </div>

          {/* Project Settings Icon (Click to Toggle Popup) */}
          <img
            src="/assets/setting.svg"
            alt="Settings"
            className="project-settings-icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevents toggleSection from being triggered
              setSettingsVisible(!settingsVisible);
            }}
          />

          {/* Settings Popup */}
          {settingsVisible && (
            <div 
              className="project-settings-popup" 
              ref={settingsRef} 
              onClick={(e) => e.stopPropagation()} // Prevents toggling the board/project
            >
              <div className="project-settings-option" onClick={() => alert("Share Project Clicked")}>
                Share Project
              </div>
              <div className="project-settings-option" onClick={() => alert("Edit Project Clicked")}>
                Edit Project
              </div>
              <div className="project-settings-option delete" onClick={() => alert("Delete Project Clicked")}>
                Delete Project
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conditionally Render Board or ProjectPopup */}
      {isBoardVisible ? <BoardSection /> : <ProjectSection setSelectedProject={setSelectedProject} />}
    </div>
  );
};

export default BoardProject;  