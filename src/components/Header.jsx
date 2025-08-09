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