//Login.tsx
import { signInWithPopup, User, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import React from 'react';
import { useContext } from "react";
import { Link } from "react-router-dom"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase';
import './Login.css';
import { AuthContext } from "../AuthContext";
 

function Login() {
    const [user] = useAuthState(auth);

    return (
        <div className="userInfo">
            {user ? (
                <>
                    <UserInfo user={user} />
                    <SignOutButton />
                </>
            ) : (
                <SignInButton />
            )}
        </div>
    );
}

export default Login;

function SignInButton() {
    return (
        
        <Link to="/signin">
            <button 
                className="signin-button"
            >
                <p>サインイン</p>
            </button>
        </Link>
    );
}

function SignOutButton() {
    const { signOut } = useContext(AuthContext);

    return (
        <button 
            className="signout-button"
            onClick={ async () => { 
                await auth.signOut()
                signOut();
            }}
        >
            <p>サインアウト</p>
        </button>
    );
}

function UserInfo({ user }: {user: User}) {
    const { photoURL } = user;

    return (
        <div>
            {photoURL && (
                <img 
                    src={photoURL} 
                    alt="User Icon" 
                    className="userIcon"
                />
            )}
        </div>
    );
}