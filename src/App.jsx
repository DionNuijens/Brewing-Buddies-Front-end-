import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Components/NavBar.jsx';
import './App.css'; 
import './css/NavBar.css'; 
import Home from './pages/ConnectPage.jsx';
import AboutPage from './pages/ManageUser.jsx'; 
import CreateUserPage from './pages/CreateUser.jsx';
import RegistrationPage from './pages/ContactPage.jsx';
import EditUserPage from './pages/EditUserPage.jsx'; 
import LoginPage from './pages/LoginPage.jsx';
import ManageRequestPage from './pages/RequestPage.jsx';
import CreatReqeustPage from './pages/CreateRequest.jsx';
import NotificationComponent from './Components/Notification.jsx';
import HomePage from './pages/HomePagee.jsx';

function App() {
  return (
    <Router>
      <div className="navbar-container">
        <NavBar />
      </div>
      <div className="content-container">
        <Routes>
          <Route path="/Connect" element={<Home />} />
          <Route path="/manageUsers" element={<AboutPage />} />
          <Route path="/createUser" element={<CreateUserPage />} />
          <Route path="/registration" element={<RegistrationPage />} /> 
          <Route path="/editUser" element={<EditUserPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/manageRequests" element={<ManageRequestPage />} /> 
          <Route path="/createRequest" element={<CreatReqeustPage />} /> 
          <Route path="/notification" element={<NotificationComponent />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;