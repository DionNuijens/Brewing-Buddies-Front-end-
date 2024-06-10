import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ManageUser.css';
import axios from 'axios';

const AboutPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));


  const navigate = useNavigate();

const handeleConnect = (user) => {
  sessionStorage.setItem('userConnect', JSON.stringify(user));

  navigate('/');
}

  const handleEdit = (user) => {
    sessionStorage.setItem('userEdit', JSON.stringify(user));
    navigate(`/edit`);
  };

  const handleDelete = (user) => {
    const confirmed = window.confirm('Are you sure you want to proceed?');
    if (confirmed) {
      axios.delete(`https://localhost:7097/Delete?userId=${user.id}`)
        .then(() => setStatus('Delete successful'))
        .catch((error) => {
          console.error('Error deleting user:', error);
          setStatus('Delete failed');
        });
      console.log('Confirmed');
      window.location.reload();
    } else {
      console.log('Cancelled');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7097/account/${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (!userSession) {
      setSessionError('No session found. Please log in.');
    } else {
      fetchData();
    }
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      {sessionError ? (
        <p className="error-message">{sessionError}</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : data.length > 0 ? (
        data.map((user, index) => (
          <div key={index} className="user-container">
            <p className="user-name">
              {user.userName}
            </p>
            <div className="button-container">
              <button onClick={() => handleDelete(user)}>
                Delete
              </button>
              <button onClick={() => handleEdit(user)}>Edit</button>
              {user.riotId === null ? (
              <button onClick={() => handeleConnect(user)}>
                Connect Account
              </button>
            ) : (
              <button className='connect-button'>
                Connect Account
              </button>
            )}
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AboutPage;