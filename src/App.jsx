// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Components/NavBar.jsx';
import './App.css'; 
import './css/NavBar.css'; 
import Home from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx'; 
import CreateUserPage from './pages/ServicesPage.jsx';
import RegistrationPage from './pages/ContactPage.jsx';
import EditUserPage from './pages/EditUserPage.jsx'; 
import LoginPage from './pages/LoginPage.jsx';
// import RequestPage from './pages/users.jsx';
import ManageRequestPage from './pages/users.jsx';
import CreatReqeustPage from './pages/CreateRequest.jsx';

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
          <Route path="/services" element={<CreateUserPage />} />
          <Route path="/contact" element={<RegistrationPage />} /> 
          <Route path="/edit" element={<EditUserPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/requests" element={<ManageRequestPage />} /> 
          <Route path="/createRequest" element={<CreatReqeustPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;