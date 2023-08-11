//Login.tsx
import { signInWithPopup, User } from "firebase/auth";
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase';
import './Login.css';
 

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
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };

    return (
        <button onClick={signInWithGoogle}>
            <p>サインイン</p>
        </button>
    );
}

function SignOutButton() {
    return (
        <button onClick={() => auth.signOut()}>
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