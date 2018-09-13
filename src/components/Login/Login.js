import React from 'react';
// Check if user logging in matches admin auth0id stored in DB
const Login = () => {

    const login = () => {
        console.log(process.env.REACT_APP_AUTH0_DOMAIN);
        
        // window.location.origin means `this website, whichever one I'm currently on`, e.g. http://localhost:3000
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        const scope = encodeURIComponent('openid profile email');
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`;
      }

    return ( 
        <div>
            <button onClick={login}>Log in</button>
        </div>
     );
}
 
export default Login;