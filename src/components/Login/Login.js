import React from 'react';
import './login.css';
// Check if user logging in matches admin auth0id stored in DB
const Login = () => {

    const login = () => {
        console.log(process.env.REACT_APP_AUTH0_DOMAIN);
        const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
        const scope = encodeURIComponent('openid profile email');
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`;
      }

    return ( 
        <div className="login">
            <button onClick={login}>Log in</button>
        </div>
     );
}
 
export default Login;