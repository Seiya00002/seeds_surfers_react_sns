import { signInWithPopup } from "firebase/auth";
import React from 'react';
import { auth, provider } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
 
function Login() {
    const [user] = useAuthState(auth);
    
    return(
        <div>
            <SignInButton />
        </div>
    );
}

export default Login;

// サインインボタン
function SignInButton() {

    const signInWithGoogle = () => {
        // Firebaseを使ってサインイン
        signInWithPopup(auth, provider);
    };

    return(
        <button onClick={signInWithGoogle}>
            <p>Googleでサインイン</p>
        </button>
    )
}