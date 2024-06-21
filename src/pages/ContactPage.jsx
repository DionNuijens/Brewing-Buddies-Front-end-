import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Login';
import Logout from '../Components/Logout';

const RegistrationPage = () => {
  // const [naam, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [hash, setHash] = useState('');

  // const navigate = useNavigate();

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handleHashChange = (event) => {
  //   setHash(event.target.value);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const newUser = {
  //     naam: naam,
  //     email: email,
  //     hash: hash
  //   };

  //   try {
  //     const response = await fetch('https://localhost:7097/AddUserrr', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newUser),
  //     });

  //     if (response.ok) {
  //       console.log('User registered successfully');
  //       navigate(`/`);
  //     } else {
  //       console.error('Failed to register user');
  //     }
  //   } catch (error) {
  //     console.error('Error registering user:', error);
  //   }
  // };

  // return (
  //   <div>
  //     <h1>Registration Page</h1>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="name">Name:</label>
  //         <input type="text" id="name" value={naam} onChange={handleNameChange} />
  //       </div>
  //       <div>
  //         <label htmlFor="email">Email:</label>
  //         <input type="email" id="email" value={email} onChange={handleEmailChange} />
  //       </div>
  //       <div>
  //         <label htmlFor="hash">Password:</label>
  //         <input type="password" id="hash" value={hash} onChange={handleHashChange} />
  //       </div>
  //       <button type="submit">Register</button>
  //     </form>
  //     <div>
  //       <Login />
  //       <Logout />
  //     </div>
  //   </div>
  // );
};

export default RegistrationPage;