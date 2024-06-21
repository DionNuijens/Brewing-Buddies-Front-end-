import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../css/ManageUser.css';
import axios from 'axios';

const AboutPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  // const { getAccessTokenSilently } = useAuth0(); 

  const handeleConnect = (user) => {
    sessionStorage.setItem('userConnect', JSON.stringify(user));
    navigate('/');
  };

  const handleEdit = (user) => {
    sessionStorage.setItem('userEdit', JSON.stringify(user));
    navigate(`/edit`);
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm('Are you sure you want to proceed?');
    if (confirmed) {
      try {
      const accessToken = await getAccessTokenSilently(); 
      const response = axios.delete(`https://localhost:7097/Delete?userId=${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      console.log('User deleted successfully');
      // console.log(response);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
      console.log('Delete failed');
    }
    console.log('Confirmed');;
    } else {
      console.log('Cancelled');
    }
  };

  const fetchData = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      console.log(accessToken);

      const response = await axios.get(`https://localhost:7097/account?AccountId=${user.sub}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

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
              <button id="deleteUser" onClick={() => handleDelete(user)}>
                Delete
              </button>
              <button id="editUser" onClick={() => handleEdit(user)}>Edit</button>
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