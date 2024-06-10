import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
  const [userName, setUserName] = useState('');
  const [sessionError, setSessionError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  
  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newUser = { userName, accountId: user.id };
    
    try {
      const response = await fetch(`https://localhost:7097/AddUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log('User created successfully');
        navigate(`/about`);
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (!userSession) {
      setSessionError('No session found. Please log in.');
    }
  }, []);

  return (
    <div>
      <h1>Create User Page</h1>
      {sessionError ? (
        <p className="error-message">{sessionError}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={userName}
            onChange={handleInputChange}
            placeholder='Enter username'
          />
          <button type="submit">Create User</button>
        </form>
      )}
    </div>
  );
};

export default CreateUserPage;