    import React, { useState, useEffect } from 'react';
    import '../css/Request.css'; 
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import { ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { useAuth0 } from '@auth0/auth0-react';
    import { toast } from 'react-toastify'

    function ManageRequestPage() {
        const [pendingRequests, setPendingRequests] = useState([]);
        const [defender, setDefender] = useState([]);
        const [ongoing, setOngoing] = useState([]);
        const [complete, setComplete] = useState([]);
        const [error, setError] = useState(null);
        const [isButtonDisabled, setIsButtonDisabled] = useState(false);
        const navigate = useNavigate();
        const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0(); 

        useEffect(() => {

            if (isLoading) return;
            
            if (!isAuthenticated) {
                setError('You must be logged in to view this page.');
                return;
            }

            const fetchRequests = async () => {
                try {
                    const accessToken = await getAccessTokenSilently();
                    const responses = await Promise.all([
                        fetch(`https://localhost:7097/GetPending?AccountID=${user.sub}`, {
                            headers: { 'Authorization': `Bearer ${accessToken}` }
                        }),
                        fetch(`https://localhost:7097/GetReceived?AccountID=${user.sub}`, {
                            headers: { 'Authorization': `Bearer ${accessToken}` }
                        }),
                        fetch(`https://localhost:7097/GetOngoing?AccountID=${user.sub}`, {
                            headers: { 'Authorization': `Bearer ${accessToken}` }
                        }),
                        fetch(`https://localhost:7097/GetComplete?AccountID=${user.sub}`, {
                            headers: { 'Authorization': `Bearer ${accessToken}` }
                        })
                    ]);
            
                    const isAnyNotOk = responses.some(response => !response.ok);
                    if (isAnyNotOk) {
                        throw new Error('Failed to fetch requests');
                    }
            
                    const [data1, data2, data3, data4] = await Promise.all(responses.map(response => response.json()));
            
                    setPendingRequests(data1);
                    setDefender(data2);
                    setOngoing(data3);
                    setComplete(data4);
                } catch (error) {
                    setError(error.message);
                }
            };

            fetchRequests();
        }, [getAccessTokenSilently, user, isAuthenticated, navigate]);

        const handleCreate = () => {
            navigate('/createRequest');
        };

        const handleDelete = async (request) => {
            const confirmed = window.confirm('Are you sure you want to proceed?');
            if (confirmed) {
                try {
                    const accessToken = await getAccessTokenSilently();
                    await axios.delete(`https://localhost:7097/DeleteRequest?userId=${request.id}`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    console.log('Request deleted successfully');
                    window.location.reload();
                } catch (error) {
                    console.error('Error deleting request:', error);
                    console.log('Delete failed');
                }
                console.log('Confirmed');
            } else {
                console.log('Cancelled');
            }
        };

        const handleUpdate = async (request) => {
            try {
                setIsButtonDisabled(true);
                const accessToken = await getAccessTokenSilently();
                const response = await fetch(`https://localhost:7097/api/Values/UpdateRequest?id=${request.id}`, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(request)
                });
                console.log(response);
                if (!response.ok) {
                    toast('Unable to update :(');
                    throw new Error('Network response was not ok');
                }

                window.location.reload();
            } catch (error) {
                console.error('Error:', error);
            }
            setIsButtonDisabled(false);
        };

        const handleAccept = async (request) => {
            console.log(request);
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await fetch(`https://localhost:7097/updateRequest`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(request)
                });

                if (response.ok) {
                    console.log('Request accepted successfully');
                } else {
                    console.error('Failed to accept request');
                }
            } catch (error) {
                console.error('Error accepting request:', error);
            }
            window.location.reload();
        };

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (!isAuthenticated) {
            return (
                <div className="request-page">
                    <h1 className="page-title">Requests</h1>
                    {error && <p>Error: {error}</p>}
                </div>
            );
        }

        return (
            <div className="request-page">
            <ToastContainer />
                <h1 className="page-title">Requests</h1>
                {/* <NotificationComponent /> */}
                {error && <p>Error: {error}</p>}
                <div className="request-categories">
                    <button onClick={handleCreate}>Create Request</button>
                    <h2 className="category-title">Received</h2>
                    <div>
                        {defender.length > 0 ? (
                            defender.map((defender) => (
                                <div key={defender.id}>
                                    <p>{defender.challenger} VS {defender.defender}
                                        <button onClick={() => handleAccept(defender)}>Accept!</button>     
                                        <button onClick={() => handleDelete(defender)}>Delete!</button>                                    
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No requests received</p>
                        )}
                    </div>
                    <h2 className="category-title">Pending</h2>
                    <div>
                        {pendingRequests.length > 0 ? (
                            pendingRequests.map((request) => (
                                <div key={request.id}>
                                    <p>{request.challenger} VS {request.defender}
                                        <button onClick={() => handleDelete(request)}>Delete!</button>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No pending requests available</p>
                        )}
                    </div>
                    <h2 className="category-title">Started</h2>
                    {ongoing.length > 0 ? (
                        ongoing.map((ongoing) => (
                            <div key={ongoing.id}>
                                <p>
                                    {ongoing.challenger} VS {ongoing.defender}
                                    <button onClick={() => handleUpdate(ongoing)} disabled={isButtonDisabled}>Update!</button>
                                    <button onClick={() => handleDelete(ongoing)}>Delete!</button>                                    
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No requests received</p>
                    )}
                    <h2 className="category-title">Completed</h2>
                    {complete.length > 0 ? (
                        complete.map((complete) => (
                            <div key={complete.id}>
                                <p>
                                    <strong>{complete.challenger}</strong> (KDA: {complete.challengerKDA}) 
                                    <span> VS </span> 
                                    <strong>{complete.defender}</strong> (KDA: {complete.defenderKDA})
                                </p>
                                <p>
                                    <em>So the winner is: </em> 
                                    <strong>{complete.winner}</strong>
                                    <button onClick={() => handleDelete(complete)}>Delete!</button>
                                </p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No requests received</p>
                    )}
                </div>
            </div>
        );
    }

    export default ManageRequestPage;