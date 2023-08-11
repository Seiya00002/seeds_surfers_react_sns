import { signInWithPopup } from "firebase/auth";
import React from 'react';
import { auth } from './firebase';
 
function Login() {
    return(
        <div>
            <SignInButton />
        </div>
    );
}

export default Login;

function SignInButton() {
    return(
        <button >
            <p>Googleでサインイン</p>
        </button>
    )
}