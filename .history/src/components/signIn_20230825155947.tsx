import React, { useState, useContext } from "react";
import { signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../AuthContext";
import { auth } from "../firebase";
import "./SignIn.css";

function SignIn() {
    const { user } = useContext(AuthContext);

    return(
        <div className="">
            <SignInWithGoogle />
            <SignInWithEmailPassword />
        </div>
    );
}

function SignInWithGoogle () {
    const { setUser } = useContext(AuthContext);
    const GoogleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, GoogleProvider)
        .then((result) => {
            const user = result.user;
            setUser(user);
        })
        .catch((error) => {
            console.log("Googleログインエラー:", error);
        });
    };
    return(
        <div>
            <h2>サインイン</h2>
            <button className="google-signin" onClick={signInWithGoogle}>
                <p>Googleアカウントでログイン</p>
            </button>
            <p>--------------------OR--------------------</p>
        </div>
    )
}

function SignInWithEmailPassword() {
    const { setUser } = useContext(AuthContext);
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");

    const signUpWithEmailPassword = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
            })
            .catch((error) => {
                console.error("ユーザー作成エラー:", error);
            });
    };

    return(
        <div className="user-make">
            <input
                type="email"
                placeholder="Eメール"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="usermake-button" 
                onClick={signUpWithEmailPassword}
            >
                <p>ユーザー作成</p>
            </button>
        </div>
    )
}

export default SignIn;