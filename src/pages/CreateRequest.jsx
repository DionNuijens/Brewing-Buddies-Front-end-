import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatReqeustPage() {
  const [dropdownOptions1, setDropdownOptions1] = useState([]);
  const [dropdownOptions2, setDropdownOptions2] = useState([]);
  const [selectedUser1, setSelectedUser1] = useState('');
  const [selectedUser2, setSelectedUser2] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    fetch(`https://localhost:7097/account/${user.id}`)
      .then(response => response.json())
      .then(data => {
        setDropdownOptions1(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching dropdown 1 options:', error);
      });

    fetch(`https://localhost:7097/Notaccount/${user.id}`)
      .then(response => response.json())
      .then(data => {
        setDropdownOptions2(data);
      })
      .catch(error => {
        console.error('Error fetching dropdown 2 options:', error);
      });
  }, [user.id]);

  const handleUserSelect1 = (event) => {
    setSelectedUser1(event.target.value);
  };

  const handleUserSelect2 = (event) => {
    setSelectedUser2(event.target.value);
  };

  const handleCreateRequest = async () => {
    const newRequest = { state: 0, challenger: selectedUser1, defender: selectedUser2, winner: ""};
    try {
        const response = await fetch(`https://localhost:7097/AddRequest`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRequest),
        });
  
        if (response.ok) {
          console.log('User created successfully');
            navigate(`/requests`);
        } else {
          console.error('Failed to create user');
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
  };

  return (
    <div className="request-page">
      <h1>Create Request</h1>
      <div>
        <label>Your account:</label>
        <select value={selectedUser1} onChange={handleUserSelect1}>
          <option value="">Select an account</option>
          {dropdownOptions1.map(option => (
            <option key={option.id} value={option.id}>
              {option.userName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Enemy account:</label>
        <select value={selectedUser2} onChange={handleUserSelect2}>
          <option value="">Select an account</option>
          {dropdownOptions2.map(option => (
            <option key={option.id} value={option.id}>
              {option.userName}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCreateRequest}>Create Request</button>
    </div>
  );
}

export default CreatReqeustPage;