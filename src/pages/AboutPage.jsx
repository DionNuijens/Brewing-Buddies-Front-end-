import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ManageUser.css'; 
import axios from 'axios'; 


const AboutPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    navigate(`/edit`)

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
      window. location. reload();

    } else {
      console.log('Cancelled');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7097/GetUsers'); 
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
    fetchData();
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      {error ? (
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
              <button   onClick={() => handleEdit(user)}>Edit</button>
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