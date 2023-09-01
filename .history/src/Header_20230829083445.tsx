import React from "react";
import { Link } from "react-router-dom"; 
import { AuthProvider } from './AuthContext';
import './Header.css';

function Header() {
    return(
        <AuthProvider>
            <div className="header">
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