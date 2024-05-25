import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ManageUser.css'; // Import CSS file for styling
import axios from 'axios'; // Import Axios


const AboutPage = () => {
  // State to store the data fetched from the API
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
      // Perform the action
      axios.delete(`https://localhost:7097/Delete?userId=${user.id}`)
        .then(() => setStatus('Delete successful'))
        .catch((error) => {
          console.error('Error deleting user:', error);
          setStatus('Delete failed');
        });
      console.log('Confirmed');
      window. location. reload();

    } else {
      // Handle the cancellation
      console.log('Cancelled');
    }
  };

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      // Make API request to fetch data
      const response = await fetch('https://localhost:7097/GetUsers'); // Ensure the protocol is correct
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse JSON response
      const jsonData = await response.json();
      // Set the fetched data to the state
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  // useEffect hook to fetch data when the component mounts
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
            {/* Buttons in the same line */}
            <div className="button-container">
              {/* <button className="action-button" onClick={() => handleButtonClick(user.userName)}>Button 1</button> */}
              <button onClick={() => handleDelete(user)}>
                Delete
              </button>
              <button   onClick={() => handleEdit(user)}>Edit</button>
            </div>
            {/* Render other data fields as needed */}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AboutPage;