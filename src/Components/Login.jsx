import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../css/Button.css';
import '../css/NavBar.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;