import React, { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from '@auth0/auth0-react';

const NotificationComponent = () => {
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const establishConnection = async () => {
            try {
                const token = await getAccessTokenSilently();

                const connection = new signalR.HubConnectionBuilder()
                    .withUrl("https://localhost:7097/NotificationHub", {
                        accessTokenFactory: () => token,
                    })
                    .withAutomaticReconnect()
                    .build();

                connection.on("ReceiveNotification", (notification) => {
                    console.log(notification);
                    toast(notification.toString());
                });

                await connection.start();
                console.log('SignalR Connected.');

                return () => {
                    connection.off("ReceiveNotification"); 
                    connection.stop(); 
                };
            } catch (error) {
                console.error('SignalR Connection Error: ', error);
            }
        };

        establishConnection();
    }, [getAccessTokenSilently]);

    return (
        <div>
            <ToastContainer />
            <h2>Notifications</h2>
        </div>
    );
};

export default NotificationComponent;