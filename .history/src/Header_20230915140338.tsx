import React from "react";
import { Link } from "react-router-dom"; 
import './Header.css';

function Header() {

    return(
            <div className="header">
                <div className="header-title">
                <h2>-Seeds Surfers-</h2>
                <h4>with cova.amigo</h4>
                </div>
                <Link to="/account">
                <button className="settingButton">
                    <img src="image/setting-icon.png" className="icon" alt="setting" />
                </button>
                </Link>
            </div>
    )
}

export default Header;