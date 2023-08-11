import { signInWithPopup } from "firebase/auth";
import React from 'react';
import { auth } from './firebase';
 
function Login() {
    return(
        <div>
            <h2>ログイン</h2>
            {/* <SignInButton /> */}
        </div>
    );
}

export default Login;