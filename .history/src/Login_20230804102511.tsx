import { signInWithPopup } from "firebase/auth";
import React from 'react';
import { auth } from './firebase';
 
function Login() {
    return(
        <div>
            <SingnInButton />
        </div>
    );
}

export default Login;