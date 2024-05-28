// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Components/NavBar.jsx'; 
import './App.css'; 
import './css/NavBar.css'; 
import Home from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx'; 
import Services from './pages/ServicesPage.jsx';
import Contact from './pages/ContactPage.jsx';
import EditUserPage from './pages/EditUserPage.jsx'; 

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