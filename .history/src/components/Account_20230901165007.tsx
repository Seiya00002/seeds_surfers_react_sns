import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { updateProfile, deleteUser } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Account.css";

function Account () {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [ displayName, setDisplayName] = useState<string | null>(null)
    const [ accountEmail, setAccountEmail] = useState<string | null>(null)
    const [ accountPassword, setAccountPassword] = useState<string | null>(null)
    const [ imageURL, setImageURL] = useState<string | null>(null);
    const [ imageFile, setImageFile] = useState<File | null>(null);

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
            }
        } catch (error) {
            console.error("プロフィール変更エラー:", error);
        }
    };

    const handleEmailChange = async () => {
        try {
            if(user) {
            await updateProfile(user, { accountEmail: accountEmail || "" });
            }
        } catch (error) {
            console.error("プロフィール変更エラー:", error);
        }
    }

    const handlePasswordChange = async () => {
        try {
            if(user) {
            await updateProfile(user, { accountPassword: accountPassword || ""});
            }
        } catch (error) {
            console.error("プロフィール変更エラー:", error);
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
            }    
        }
    };

    const fileChange = (e:any) => {
        const file = e.target.value;
        if(file) {
            setImageFile(file);
        }
    }

    const handleAccountDelete = async() => {

    if(user) {
        try {
            await deleteUser(user);
            navigate('/');
        } catch (error) {
            console.log("アカウント削除エラー:", error);
        }
    }

    return(
        <div className="accountSetting">
            <h2>アカウント設定</h2>
            <div>
                <label>ユーザー名:</label>
                <input
                    type="text"
                    placeholder="ユーザー名"
                    value={displayName || ""}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <button 
                className="change-button" 
                onClick={handleDisplayNameChange}
                >
                <p>変更</p>
                </button>
            </div>
            <div>
                <label>メールアドレス:</label>
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={accountEmail || ""}
                    onChange={(e) => setAccountEmail(e.target.value)}
                />
                <button 
                className="change-button" 
                onClick={handleEmailChange}
                >
                <p>変更</p>
                </button>
            </div>
            <div>
                <label>パスワード:</label>
                <input
                    type="text"
                    placeholder="パスワード"
                    value={accountPassword || ""}
                    onChange={(e) => setAccountPassword(e.target.value)}
                />
                <button 
                className="change-button" 
                onClick={handlePasswordChange}
                >
                <p>変更</p>
                </button>
            </div>
            <div>
                <label>プロフィール画像:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={fileChange}
                />
                <button 
                className="change-button" 
                onClick={handleProfileImageChange}
                >
                <p>変更</p>
                </button>
            </div>
            

            <button 
             className="change-button" 
             onClick={handleAccountDelete}
             >
             <p>アカウント削除</p>
            </button>
        </div>
    )
}
}

export default Account; 