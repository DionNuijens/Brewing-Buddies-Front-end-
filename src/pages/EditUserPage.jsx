import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const EditUserPage = () => {
  const [userName, setUserName] = useState('');
  const user = JSON.parse(sessionStorage.getItem('userEdit'));
  const { getAccessTokenSilently } = useAuth0();

  useState(() => {
    setUserName(user.userName);
  }, [user.userName]);

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const updatedUser = { ...user, userName };

    try {
      const response = await fetch(`https://localhost:7097/updateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        console.log('User updated successfully');
        navigate(`/about`)
      } else {
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
        <input id="userName" type='text' value={userName} onChange={handleInputChange} />
        <button id="updateUser" type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserPage;