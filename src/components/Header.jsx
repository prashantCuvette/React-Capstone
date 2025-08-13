<<<<<<< ours
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  // const { user, logout } = useAuth();
  const user = true;

  const headerStyle = {
    backgroundColor: "#282c34",
    padding: "1rem",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const leftSectionStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: 0,
  };

  const rightSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const userEmailStyle = {
    fontSize: "0.9rem",
    color: "#ccc",
  };

  const logoutButtonStyle = {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease",
  };

  const handleLogout = () => {
    logout();
    // Add navigation logic here if needed
  };

  return (
    <div style={headerStyle}>
      <h1 style={leftSectionStyle}>MyTasks</h1>
      <div style={rightSectionStyle}>
        {user && (
          <>
            <span style={userEmailStyle}>a@a.com</span>
            <button
              style={logoutButtonStyle}
              onClick={handleLogout}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
=======
import React from 'react';

import '../styles.css';

export default function Header() {
  return (<div>
      <header id="main-header">
      <div className="logo">My-Project</div>
      <button className="hamburger" id="hamburger-btn">☰</button>
      <nav id="desktop-nav">
        <a href="#dashboard" id="nav-dashboard">Dashboard</a>
        <a href="#tasks" id="nav-tasks">Tasks</a>
        <a href="#notes" id="nav-notes">Notes</a>
        <span id="user-info"></span>
        <button id="logout-btn" style={{display: none}}>Logout</button>
      </nav>
      </header>
    </div>);
}
>>>>>>> theirs
