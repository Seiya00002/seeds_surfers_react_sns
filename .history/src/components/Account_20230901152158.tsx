import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { updateProfile, deleteUser } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Account.css";

function Account () {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [ accountEmail, setAccountEmail] = useState('');
    const [ accountPassword, setAccountPassword] = useState('');
    const [ displayName, setDisplayName] = useState('');
    const [ profileImage, setProfileImage] = useState(null);
    const [ imageURL, setImageURL] = useState('');
    const [ imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if(user) {
            setDisplayName(user.displayName);
            setImageURL(user.photoURL);
        }
    }, [user]);

    const handleDisplayNameChange = async () {
        try {
            await updateProfile(user, { displayName });
        } catch (error) {
            console.error("プロフィール変更エラー:", error);
        }
    }

    const handleProfileImageChange = async () => {

    }

    const fileChange = (e:any) => {
        const file = e.target.value;
        if(file) {
            setImageFile(file);
        }
    }

    const handleDelete = () => {

        deleteUser(user).then(() => {
            <p>ユーザー削除完了しました。</p>
        }).catch((error) => {
            console.error("ユーザー削除エラー:", error);
        });
    }

    return(
        <div className="accountSetting">
            <h2>アカウント設定</h2>
            <div>
                <label>ユーザー名:</label>
                <input
                    type="text"
                    placeholder="ユーザーネイム"
                    value={displayName}
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
                    value={accountEmail}
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
                    value={accountPassword}
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

export default Account; 