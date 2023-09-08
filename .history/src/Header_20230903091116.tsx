import React from "react";
import { Link } from "react-router-dom"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import './Header.css';

function Header() {
    // const [user] = useAuthState(auth);

    return(
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
    )
}

export default Header;