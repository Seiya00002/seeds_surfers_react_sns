import React, { useState, useContext } from "react";
import { signInWithPopup, updateProfile, createUserWithEmailAndPassword, GoogleAuthProvider, User } from "firebase/auth";
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
    const [ displayName, setDisplayName] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ profileImage, setProfileImage] = useState<string | null>(null);

    const DEFAULT_PROFILE_IMAGE_URL = "/cactus-icon.png";

    const signUpWithEmailPassword = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateProfileInfo(user);
            })
            .catch((error) => {
                console.error("ユーザー作成エラー:", error);
            });
    };

    const updateProfileInfo = async (user: User) => {
        try {
            await updateUserProfile(user, { displayName, photoURL: profileImage });
        } catch (error) {
            console.error("プロフィール情報更新エラー:",error);
        }
    };

    const updateUserProfile = async (user: User, profileData: { displayName: string, photoURL: string | null}) => {
        await updateProfile(user, profileData);
    };

    return(
        <div className="user-make">
            <input
                type="text"
                placeholder="ユーザー名"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />
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
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if(file) {
                        setProfileImage(file);
                    } else {
                        setProfileImage(DEFAULT_PROFILE_IMAGE_URL);
                    }
                }}
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