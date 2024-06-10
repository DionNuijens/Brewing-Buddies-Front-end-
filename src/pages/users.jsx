import React, { useState, useEffect } from 'react';
import '../css/Request.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

function ManageRequestPage() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [defender, setDefender] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [error, setError] = useState(null);
    const [sessionError, setSessionError] = useState(null);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const response = await fetch(`https://localhost:7097/challenger/${user.id}`);
                const response2 = await fetch(`https://localhost:7097/defender/${user.id}`);
                const response3 = await fetch(`https://localhost:7097/ongoing/${user.id}`);


                if (!response.ok) {
                    throw new Error('Failed to fetch pending requests');
                }
                const data = await response.json();
                const data2 = await response2.json();
                const data3 = await response3.json();
                setPendingRequests(data);
                setDefender(data2);
                setOngoing(data3);
            } catch (error) {
                setError(error.message);
            }
        };

        // Call the fetchPendingRequests function when the component mounts
        fetchPendingRequests();

        // Clean up function to cancel any pending requests
        return () => {
            // Cleanup code, if needed
        };
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const handleCreate = () => {
        navigate('/createRequest');
    };

    const handleAccept = async (request) => {
        console.log(request);
        const newRequest = { id: request.id, state: 1};

        try {
            const response = await fetch(`https://localhost:7097/updateRequest`,
             {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRequest),
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
    }

    return (
        <div className="request-page">
            <h1 className="page-title">Requests</h1>
            <div className="request-categories">
                <button onClick={handleCreate}>Create Request</button>
                <h2 className="category-title">Received</h2>
                <div>
                    {defender.length > 0 ? (
                        defender.map((defender) => (
                            <div key={defender.id}>
                            <p>{defender.challenger} VS {defender.defender}
                            <button  onClick={() => handleAccept(defender)}>Accept!</button>                            
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
                                {/* Render your pending request data here */}
                                <p>{request.challenger} VS {request.defender}</p>
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
                            <p>{ongoing.challenger} VS {ongoing.defender}
                            </p>
                            </div>
                        ))
                    ) : (
                        <p>No requests received</p>
                    )}
                <h2 className="category-title">Completed</h2>
            </div>
            {error && <p>Error: {error}</p>}
            {sessionError && <p>{sessionError}</p>}
        </div>
    );
}

export default ManageRequestPage;