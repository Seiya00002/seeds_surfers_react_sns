import { signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import React from 'react';
import { auth, provider } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect} from 'react';
 
function Login() {
    const [user] = useAuthState(auth);

    return(
        <div>
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
            <p>Googleでサインイン</p>
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

    const [ userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const unsubscribeAuthStateChanged = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUserInfo(user ? user : null);
            } else {
                setUserInfo(null)
            }
        });

        return() => unsubscribeAuthStateChanged();
    },[]);

    if(userInfo){
        const { displayName, photoURL } = userInfo;
    
        return(
            <div className="userInfo">
                {photoURL && <img src={photoURL} alt="User Icon" />}
                <p>{displayName}</p>
            </div>
        )
    } else {
        return null;
    }
}