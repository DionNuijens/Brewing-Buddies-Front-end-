import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Function to handle input changes
  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new user object
    const newUser = { userName };

    try {
      // Send POST request to create user
      const response = await fetch(`https://localhost:7097/AddUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        // Handle success
        console.log('User created successfully');
        navigate(`/about`);
      } else {
        // Handle error
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Create User Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={userName}
          onChange={handleInputChange}
          placeholder='Enter username'
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUserPage;