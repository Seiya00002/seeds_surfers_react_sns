import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, storage } from "../firebase";
import { updateProfile, deleteUser, updateEmail, updatePassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Account.css";

function Account () {
    const user = auth.currentUser;
    const [ displayName, setDisplayName] = useState<string | null>(null)
    const [ accountEmail, setAccountEmail] = useState<string | null>(null)
    const [ accountPassword, setAccountPassword] = useState<string | null>(null)
    const [ imageURL, setImageURL] = useState<string | null>(null);
    const [ imageFile, setImageFile] = useState<File | null>(null);
    const [ message, setMessage] = useState<string | null>(null);


    useEffect(() => {
        if(user) {
            setDisplayName(user.displayName);
            setImageURL(user.photoURL);
        }
    }, [user]);

    const handleDisplayNameChange = async () => {
        try {
            if(user) {
            await updateProfile(user, { displayName: displayName || "" });
            showMessage("変更完了しました！");
            }
        } catch (error) {
            window.alert("エラーが発生しました。");
            console.error("プロフィール変更エラー:", error);
        }
    };

    const handleEmailChange = async () => {
        try {
            if(user && accountEmail) {
            await updateEmail(user, accountEmail);
            showMessage("変更完了しました！");
            }
        } catch (error) {
            console.error("プロフィール変更エラー:", error);
            window.alert("エラーが発生しました。");
        }
    }

    const handlePasswordChange = async () => {
        try {
            if(user && accountPassword) {
            await updatePassword(user, accountPassword);
            showMessage("変更完了しました！");
            }
        } catch (error) {
            console.error("プロフィール変更エラー:", error);
            window.alert("エラーが発生しました。");
        }
    }

    const handleProfileImageChange = async () => {
        if(imageFile) {
            if(user) {
                const storageRef = ref(storage, `profile_images/${user.uid}`);
                await uploadBytes(storageRef, imageFile);
                const downloadURL = await getDownloadURL(storageRef);
                await updateProfile(user, { photoURL: downloadURL });
                setImageURL(downloadURL);
                showMessage("変更完了しました！");
            }    
        }
    };

    const fileChange = (e:any) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
        }
    }

    const handleAccountDelete = async() => {

        if(user) {
            try {
                await deleteUser(user);
                showMessage("アカウントを削除しました。");
                // navigate('/');
            } catch (error) {
                console.log("アカウント削除エラー:", error);
                window.alert("エラーが発生しました。");
            }
        }
    }

    const showMessage = (text: string) => {
        setMessage(text);
        setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    return(
        <>
            <div className="accountSetting">
                <h2>アカウント設定</h2>
                <div className="user-info">
                    <label>ユーザー名:</label>
                    <input
                        type="text"
                        placeholder="ユーザー名"
                        value={displayName || ""}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <button 
                    className="accountpage-button" 
                    onClick={handleDisplayNameChange}
                    >
                    <p>変更</p>
                    </button>
                </div>
                <div className="user-info">
                    <label>メールアドレス:</label>
                    <input
                        type="email"
                        placeholder="メールアドレス"
                        value={accountEmail || ""}
                        onChange={(e) => setAccountEmail(e.target.value)}
                    />
                    <button 
                    className="accountpage-button" 
                    onClick={handleEmailChange}
                    >
                    <p>変更</p>
                    </button>
                </div>
                <div className="user-info">
                    <label>パスワード:</label>
                    <input
                        type="text"
                        placeholder="パスワード"
                        value={accountPassword || ""}
                        onChange={(e) => setAccountPassword(e.target.value)}
                    />
                    <button 
                    className="accountpage-button" 
                    onClick={handlePasswordChange}
                    >
                    <p>変更</p>
                    </button>
                </div>
                <div className="user-info">
                    <label>プロフィール画像:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={fileChange}
                    />
                    <button 
                    className="accountpage-button" 
                    onClick={handleProfileImageChange}
                    >
                    <p>変更</p>
                    </button>
                </div>
                
                {/* imageURLの使用 */}
                {imageURL !== null && (
                    <img src={imageURL}
                    alt="プロフィール画像" 
                    className="userIcon" 
                    />
                )}

                <button 
                className="delete-button" 
                onClick={handleAccountDelete}
                >
                <p>アカウント削除</p>
                </button>

                <>
                    <Link to="/">
                    <button 
                        className="home-button"
                    >
                        <p>ホーム画面に戻る</p>
                    </button>
                    </Link>
                </>
                {/* <div className="success-message">
                    <h2>変更完了しました！</h2>
                </div> */}
                {message && (
                    <div className="success-message">
                        <h2>{message}</h2>
                    </div>
                )}
            </div>
                   <a href="https://seeds-surf.com/privacy-policy/" className="privacy-policy">Privacy policy</a>
        </>
    )
}


export default Account; 