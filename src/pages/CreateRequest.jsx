import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function CreatReqeustPage() {
  const [dropdownOptions1, setDropdownOptions1] = useState([]);
  const [dropdownOptions2, setDropdownOptions2] = useState([]);
  const [selectedUser1, setSelectedUser1] = useState('');
  const [selectedUser2, setSelectedUser2] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      setError('User not authenticated.');
      return;
    }

    const fetchDropdownOptions = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log(user.sub);
        
        const response1 = await fetch(`https://localhost:7097/ConnectedAccounts?AccountId=${user.sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response1.ok) {
          throw new Error('Failed to fetch dropdown 1 options');
        }
        const data1 = await response1.json();
        setDropdownOptions1(data1);

        const response2 = await fetch(`https://localhost:7097/NotAccount?AccountId=${user.sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response2.ok) {
          throw new Error('Failed to fetch dropdown 2 options');
        }
        const data2 = await response2.json();
        setDropdownOptions2(data2);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDropdownOptions();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const handleUserSelect1 = (event) => {
    setSelectedUser1(event.target.value);
  };

  const handleUserSelect2 = (event) => {
    setSelectedUser2(event.target.value);
  };

  const handleCreateRequest = async () => {
    const newRequest = {challenger: selectedUser1, defender: selectedUser2};
    try {
      const accessToken = await getAccessTokenSilently();
      
      const response = await fetch(`https://localhost:7097/AddRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(newRequest),
      });

      if (response.ok) {
        console.log('Request created successfully');
        navigate(`/requests`);
      } else {
        console.error('Failed to create request');
      }
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="request-page">
        <h1>Create Request</h1>
        {error && <p>Error: {error}</p>}
      </div>
    );
  }

  return (
    <div className="request-page">
      <h1>Create Request</h1>
      {error && <p>Error: {error}</p>}
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