import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const CreateUserPage = () => {
  const [userName, setUserName] = useState('');
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setError('You must be logged in to create a user.');
      return;
    }

    const newUser = { userName, accountId: user.sub };

    try {
      const accessToken = await getAccessTokenSilently();

      const response = await axios.post(`http://192.168.134.6:5000/AddUser`, newUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('User created successfully');
        console.log(response.status);
        navigate(`/manageUsers`);
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Create User Page</h1>
        <div>Please log in to view this page.</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Create User Page</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          id="UserName"
          type="text"
          value={userName}
          onChange={handleInputChange}
          placeholder="Enter username"
        />
        <button id="CreateUser" type="submit" className='create-user'>Create User</button>
      </form>
    </div>
  );
};

export default CreateUserPage;