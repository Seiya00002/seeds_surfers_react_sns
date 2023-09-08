import React, { useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import "./Account.css";

function Account () {
    const { accountEmail, setAccountEmail} = useState('');
    const { accountPassword, setAccountPassword} = useState('');

    const handleChange = async () {
        try {

        }
    }

    return(
        <div className="accountSetting">
            <h2>アカウント設定</h2>
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
             onClick={handleChange}
             >
             <p>アカウント削除</p>
            </button>
        </div>
    )
}

export default Account; 