import { signInWithPopup, getAuth } from "firebase/auth";
import React from 'react';
import { auth, provider } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
 
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
    const authentication = getAuth(); 
    const person = authentication.currentUser;
    if( person!== null) {
        const photoURL = person.photoURL;
        const displayName = person.displayName;

        return(
            <div className="userInfo">
                {/* <img src={photoURL} /> */}
                <p>{displayName}</p>
            </div>
        )
    }
    
}