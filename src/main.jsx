import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
// import ReactDOM from 'react-dom/client';
import NotificationComponent from './Components/Notification.jsx';


// const root = createRoot(document.getElementById('root'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
      domain="dev-clqn0eb014t88jzg.us.auth0.com"
    clientId="7TQpC8OiBC0tVDmS94SGq0hFp1nzKX3V"
    authorizationParams={{
      audience:"https://BrewingBuddies/api",
      redirect_uri: window.location.origin,
    }}
    useRefreshTokens
    cacheLocation="localstorage"
  >


  {/* <React.StrictMode> */}
  <NotificationComponent />
    <App />
  {/* </React.StrictMode>  */}
    </Auth0Provider>
)
document.getElementById('root')
