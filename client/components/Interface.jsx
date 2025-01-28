import React, { useState, useEffect } from 'react';
import Board from './Board';
import Calendar from './Calendar';
import Task from '../../Task';
import SettingsPopup from './Settings';
import ProjectPopup from './ProjectPopup';
import ConfirmationPopup from './ConfirmationPopup';
import TaskLabel from './TaskLabel';
import List from './List';
import Member from './Member';
import Sidebar from './Sidebar'; // Assuming Sidebar.jsx exists

const Interface = ({ user }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [showProjectPopup, setShowProjectPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showLabelPopup, setShowLabelPopup] = useState(false);

  useEffect(() => {
    // Example of initializing data or any additional setup
    console.log('Interface initialized with user:', user);
  }, [user]);

  return (
    <div id="app" className="interface">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <main className="main-content">
    
        {/* Conditional Rendering for Popup Components */}
        {showCalendar && <Calendar />}
        {showTaskPopup && <Task />}
        {showSettingsPopup && <SettingsPopup />}
        {showProjectPopup && <ProjectPopup />}
        {showConfirmationPopup && <ConfirmationPopup />}
        {showLabelPopup && <TaskLabel />} 

        {/* Task List and Member Components */}
        <List />
        <Member members={[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]} />
      </main>
    </div>
  );
};

export default Interface;
