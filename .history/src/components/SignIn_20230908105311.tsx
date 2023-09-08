import React, { useState, useContext } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInWithPopup, signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword, GoogleAuthProvider, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { auth } from "../firebase";
import "./SignIn.css";

function SignIn() {

    return(
        <div className="signin-content">
            <h2>サインイン</h2>
            <SignInWithGoogle />
            <p>--------------------OR--------------------</p>
            <h4>メールアドレス・パスワードでログイン</h4>
            <EmailPasswordLogin />
            <p>--------------------新規会員登録--------------------</p>
            <SignInWithGoogle />
            <p>--------------------OR--------------------</p>
            <SignInWithEmailPassword />

        </div>
    );
}

export default SignIn;

function SignInWithGoogle () {
    const { setUser } = useContext(AuthContext);
    const GoogleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, GoogleProvider)
        .then((result) => {
            const user = result.user;
            setUser(user);
            navigate("/");
        })
        .catch((error) => {
            console.log("Googleログインエラー:", error);
        });
    };
    return(
        <div>
            <button className="nomal-button" onClick={signInWithGoogle}>
                <p>Googleアカウントでログイン</p>
            </button>
        </div>
    )
}

function EmailPasswordLogin () {
    const { setUser } = useContext(AuthContext);
    const [ loginEmail, setLoginEmail] = useState('');
    const [ loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await signInWithEmailAndPassword( auth, loginEmail, loginPassword);
            const user = result.user;
            setUser(user);
            navigate('/');
        } catch (error) {
            console.error("ログインエラー:", error);
        }
    };


    return(
        <div className="user-make">
            <input
                type="email"
                placeholder="Eメール"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
            />
             <button 
             className="usermake-button" 
             onClick={handleLogin}
             >
                <p>ログイン</p>
            </button>
        </div>
    )
}

function SignInWithEmailPassword() {
    const { setUser } = useContext(AuthContext);
    const [ displayName, setDisplayName] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ profileImage, setProfileImage] = useState<string | null>(null);
    const storage = getStorage();
    const navigate = useNavigate();

    //Storageから取得するデフォルトProfile image のgs:// パス変換関数
    const convertGsToHttps = (gsPath:any) => {
        const pathWithoutBucket = gsPath.replace("gs://seeds-surfers-react-sns.appspot.com/", "");
        return `https://firebasestorage.googleapis.com/v0/b/seeds-surfers-react-sns.appspot.com/o/${encodeURIComponent(pathWithoutBucket)}?alt=media`;
    };

    const DEFAULT_PROFILE_IMAGE_GS_PATH = "gs://seeds-surfers-react-sns.appspot.com/profile_images/cacutus-icon.png";
    const DEFAULT_PROFILE_IMAGE_URL = convertGsToHttps(DEFAULT_PROFILE_IMAGE_GS_PATH);

    const signUpWithEmailPassword = async () => {
        try{
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            setUser(user);

            if(profileImage && typeof profileImage !== "string") {
                await uploadAndSetProfileImage(profileImage);
            } else {
                setProfileImage(DEFAULT_PROFILE_IMAGE_URL);
            }

            await updateProfileInfo(user);
            navigate('/');
        } catch (error) {
            console.error("ユーザー作成エラー:", error);
        }
    };
 
    const updateProfileInfo = async (user: User) => {
        try {
            const updatedProfileData = {
                displayName,
                photoURL: profileImage || DEFAULT_PROFILE_IMAGE_URL
            };
            await updateUserProfile(user, updatedProfileData);
        } catch (error) {
            console.error("プロフィール情報更新エラー:", error);
        }
    };

    const updateUserProfile = async (user: User, profileData: { displayName: string, photoURL: string | null}) => {
        await updateProfile(user, profileData);
    };

    const uploadAndSetProfileImage = async (file: File) => {
        //ファイル参照作成
        const storageRef = ref(storage, "profile_images/" + file.name);
        //ファイルアップロード
        console.log("ファイル参照作成:", storageRef);

        await uploadBytes(storageRef, file);
        //ダウンロードURL取得
        const downloadURL = await getDownloadURL(storageRef);
        //プロフィール画像設定
        setProfileImage(downloadURL);
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
                        uploadAndSetProfileImage(file);
                    } else {
                        setProfileImage(DEFAULT_PROFILE_IMAGE_URL);
                    }
                }}
            />
            <button
                className="usermake-button" 
                onClick={() => {
                    if(!profileImage){
                        console.log("Profimage選択なし判別");
                        setProfileImage(DEFAULT_PROFILE_IMAGE_URL);
                    }
                    signUpWithEmailPassword();
                    }
                }
            >
                <p>ユーザー作成</p>
            </button>
        </div>
    )
}

