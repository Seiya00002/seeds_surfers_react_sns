//Login.tsx
import { signInWithPopup, User, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
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
                <SignInOptions />
            )}
        </div>
    );
}

export default Login;

function SignInOptions () {
    return(
        <div>
            <SignInWithGoogle />
            <SignInWithEamilPassword />
        </div>
    )
}

function SignInWithGoogle () {
    const { setUser } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
            signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user);
            })
            .catch((error) => {
                console.error("Googleログインエラー:", error);
            });
        
    };

    return(
        <button className="signin-button" onClick={signInWithGoogle}>
            <p>Googleアカウントでログイン</p>
        </button>
    );
}

function SignInWithEamilPassword () {
    
}

// function SignInButton() {
//     const { setUser } = useContext(AuthContext);

//     const signInWithGoogle = () => {
//         signInWithPopup(auth, provider).then((result) => {
//             const user = result.user;
//             setUser(user);
//         });

//     };

//     return (
//             <button 
//                 className="signin-button"
//                 onClick={signInWithGoogle}
//             >
//                 <p>サインイン</p>
//             </button>
//     );
// }

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