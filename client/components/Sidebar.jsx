import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Optional if using React Router for navigation
import '/styles/sidebar.css';

const Sidebar = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        {/* User Profile */}
        <div className="user-profile">
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="user-avatar"
          />
          <h3 className="user-name">{user.username}</h3>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
      </div>

      {/* Optional: Footer or additional content */}
      <div className="sidebar-footer">
        <p>Planify App</p>
      </div>
    </div>
  );
};

export default Sidebar;
