import { signInWithPopup, getAuth, onAuthStateChanged, User } from "firebase/auth";
import React from 'react';
import { auth, provider } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthContext } from "./AuthContext";
import { useState, useEffect, useContext } from 'react';
import './Login.css';
 
function Login() {
    const [user] = useAuthState(auth);

    return(
        <div className="userInfo">
            {user ? (
                <>
                    <UserInfo />
                    <SignOutButton />
                </>
            ) : (
                <SignInButton />
            )}
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
            <p>サインイン</p>
        </button>
    )
}

// サインアウトボタン
function SignOutButton() {
    return(
        <button onClick={() => auth.signOut()}>
            <p>サインアウト</p>
        </button>
    )
}

function UserInfo(){

    const [ userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribeAuthStateChanged = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUserInfo(user);
            } else {
                setUserInfo(null)
            }
        });

        return() => unsubscribeAuthStateChanged();
    },[]);

    if(userInfo){
        const { displayName, photoURL } = userInfo;
    
        return(
            <div>
                {photoURL && <img 
                src={photoURL} 
                alt="User Icon" 
                className="userIcon"
                />}
                <p>{displayName}</p>
            </div>
        )
    } else {
        return null;
    }
}