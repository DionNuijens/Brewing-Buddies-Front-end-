import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Login';
import Logout from '../Components/Logout';
import { useAuth0 } from "@auth0/auth0-react";


const LoginPage = () => {
//     const [givenName, setGivenName] = useState('');
//     const [givenPassword, setGivenPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const navigate = useNavigate();
//     const userr = JSON.parse(sessionStorage.getItem('user'));
//     const { getAccessTokenSilently } = useAuth0(); // Destructure getAccessTokenSilently from useAuth0 hook

//   const { user, isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }
  
//     useEffect(() => {
//         // console.log(user);
//         // const token = getAccessTokenSilently();
//         console.log(user.sub);
        
//     })
    
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setErrorMessage('');
//         setSuccessMessage('');
        
//         try {
//             const response = await fetch(`https://localhost:7097/Inlog?userName=${givenName}&hash=${givenPassword}`);
//             const data = await response.json();

//             if (response.ok && data !== 'notfound') {
//                 sessionStorage.setItem('user', JSON.stringify(data));
//                 setSuccessMessage('Login successful!');
//                 navigate('/');
//             } else {
//                 setErrorMessage('Login failed: User not found.');
//             }
//         } catch (error) {
//             setErrorMessage(`Login failed: ${error.message}`);
//         }
//     };

//     const handleLogout = () => {
//         sessionStorage.removeItem('user');
//         navigate('/login'); 
//     };

// //     return (
// //         <div>
// //             {user ? (
// //                 <div>
// //                     <h1>Welcome {user.naam}!</h1>
// //                     <button onClick={handleLogout}>Logout</button>
// //                 </div>
// //             ) : (
// //                 <form onSubmit={handleSubmit}>
// //                     <h1>Login Page</h1>
// //                     <label htmlFor='name'>Name:</label>
// //                     <input type='text' value={givenName} onChange={(event) => setGivenName(event.target.value)} />
// //                     <div>
// //                         <label htmlFor='password'>Password:</label>
// //                         <input type='password' value={givenPassword} onChange={(event) => setGivenPassword(event.target.value)} />
// //                     </div>
// //                     <div>
// //                         <button type="submit">Login</button>
// //                     </div>
// //                     <div>
// //                         <Login />
// //                         <Logout />
// //                     </div>
// //                     {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
// //                     {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
// //                 </form>
// //             )}
// //         </div>
// //     );
// // };
// return (
//     isAuthenticated && (
//       <div>
//         <img src={user.picture} alt={user.name} />
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//         <p>
//         </p>
//       </div>
//     )

//   );
};

export default LoginPage;