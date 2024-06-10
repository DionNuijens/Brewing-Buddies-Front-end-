// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar-container">
      <ul className="navbar-links">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/about" className="navbar-link">Manage Users</Link></li>
        <li><Link to="/services" className="navbar-link">Create User</Link></li>
      </ul>
      <ul className="navbar-links">
        <li><Link to="/requests" className="navbar-link">Requests</Link></li>
        <li><Link to="/contact" className="navbar-link">Registration</Link></li>
        <li><Link to="/login" className="navbar-link">Login</Link></li>
        
      </ul>
    </nav>
  );
};

export default NavBar;