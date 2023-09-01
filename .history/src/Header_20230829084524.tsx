import React from "react";
import { Link } from "react-router-dom"; 
import { AuthProvider } from './AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from './firebase';

import './Header.css';

function Header() {
    const [user] = useAuthState(auth);

    return(
        <AuthProvider>
            <div className="header">
            <div className="userInfo">
                {user ? (
                    <SignOutButton />
                ) : (
                    <SignInButton />
                )}
            </div>
                <h2>Seeds Surfers</h2>
                {/* <h3>Produced by cova.amigo</h3> */}
                <Link to="/account">
                <button
                className="settingButton"
                >
                    setting
                </button>
                </Link>
            </div>
        </AuthProvider>
    )
}

export default Header;