//Login.tsx
import { signInWithPopup, User } from "firebase/auth";
import React from 'react';
import { useContext } from "react";
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
    const { setUser } = useContext(AuthContext);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            setUser(user);
        });

    };

    return (
        <button 
        className="signin-button"
        onClick={signInWithGoogle}>
            <p>サインイン</p>
        </button>
    );
}

function SignOutButton() {
    return (
        <button 
        className="signout-button"
        onClick={() => auth.signOut()}>
            <p>サインアウト</p>
        </button>
    );
}

function UserInfo({ user }: {user: User}) {
    const { displayName, photoURL } = user;

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