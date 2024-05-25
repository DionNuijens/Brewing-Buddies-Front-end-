// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</Link></li>
        <li><Link to="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded">About</Link></li>
        <li><Link to="/services" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Services</Link></li>
        <li><Link to="/contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;