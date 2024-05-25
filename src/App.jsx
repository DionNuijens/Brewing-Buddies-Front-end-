// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Components/NavBar.jsx'; // Assuming you have a separate component file for NavBar
import './App.css'; // Import your main CSS file
import './css/NavBar.css'; // Import your NavBar CSS file

// Import your components or pages
import Home from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx'; // Import AboutPage
import Services from './pages/ServicesPage.jsx';
import Contact from './pages/ContactPage.jsx';
import EditUserPage from './pages/EditUserPage.jsx'; // Import EditUserPage

function App() {
  return (
    <Router>
      <div className="navbar-container">
        <NavBar />
      </div>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/edit" element={<EditUserPage />} /> {/* Route for EditUserPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;