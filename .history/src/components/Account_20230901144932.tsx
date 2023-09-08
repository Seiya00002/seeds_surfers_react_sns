import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { updateProfile, deleteUser } from "firebase/auth";
import "./Account.css";
import { AuthContext } from "../AuthContext";

function Account () {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [ accountEmail, setAccountEmail] = useState('');
    const [ accountPassword, setAccountPassword] = useState('');
    const [ displayName, setDisplayName] = useState('');
    

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