import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditUserPage = () => {
  const [userName, setUserName] = useState('');
  const user = JSON.parse(sessionStorage.getItem('user'));

  // Set the initial value of userName
  useState(() => {
    setUserName(user.userName);
  }, [user.userName]);

  const navigate = useNavigate();
  // Function to handle input changes
  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new user object with updated userName
    const updatedUser = { ...user, userName };

    try {
      // Send PUT request to update user
      const response = await fetch(`https://localhost:7097/updateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        // Handle success
        console.log('User updated successfully');
        navigate(`/about`)
      } else {
        // Handle error
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Edit User Page</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={userName} onChange={handleInputChange} />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserPage;