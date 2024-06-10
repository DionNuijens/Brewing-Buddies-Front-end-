import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [givenName, setGivenName] = useState('');
    const [givenPassword, setGivenPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        
        try {
            const response = await fetch(`https://localhost:7097/Inlog?userName=${givenName}&hash=${givenPassword}`);
            const data = await response.json();

            if (response.ok && data !== 'notfound') {
                sessionStorage.setItem('user', JSON.stringify(data));
                setSuccessMessage('Login successful!');
                navigate('/');
            } else {
                setErrorMessage('Login failed: User not found.');
            }
        } catch (error) {
            setErrorMessage(`Login failed: ${error.message}`);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login Page</h1>
                <label htmlFor='name'>Name:</label>
                <input type='text' value={givenName} onChange={(event) => setGivenName(event.target.value)} />
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' value={givenPassword} onChange={(event) => setGivenPassword(event.target.value)} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            </form>
        </div>
    );
};

export default LoginPage;