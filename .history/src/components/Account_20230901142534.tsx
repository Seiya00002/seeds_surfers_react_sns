import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import { updateProfile, deleteUser } from "firebase/auth";
import "./Account.css";
import { AuthContext } from "../AuthContext";

function Account () {
    const user = auth.currentUser;
    const [ accountEmail, setAccountEmail] = useState('');
    const [ accountPassword, setAccountPassword] = useState('');
    const [ accountName, setAccountName] = useState('');

    const handleChange = async () {
        try {
            await updateProfile(auth.currentUser, {
                displayName: accountName, photoURL: profilePhotoURL
            })
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
            <input
                type="name"
                placeholder="ユーザーネイム"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Eメール"
                value={accountEmail}
                onChange={(e) => setAccountEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={accountPassword}
                onChange={(e) => setAccountPassword(e.target.value)}
            />
             <button 
             className="usermake-button" 
             onClick={handleChange}
             >
             <p>変更</p>
            </button>
            <button 
             className="usermake-button" 
             onClick={handleDelete}
             >
             <p>アカウント削除</p>
            </button>
        </div>
    )
}

export default Account; 