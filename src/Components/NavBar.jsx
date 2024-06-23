import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import LoginButton from '../Components/Login.jsx';
import LogoutButton from '../Components/Logout.jsx';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar-container">
      <ul className="navbar-links">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/manageUsers" className="navbar-link">Manage Users</Link></li>
        <li><Link to="/createUser" className="navbar-link">Create User</Link></li>
        <li><Link to="/manageRequests" className="navbar-link">Requests</Link></li>
      </ul>
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li><LogoutButton /></li>
          </>
        ) : (
          <>
            <li><LoginButton /></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;