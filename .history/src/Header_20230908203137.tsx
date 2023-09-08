import React from "react";
import { Link } from "react-router-dom"; 
import './Header.css';

function Header() {

    return(
            <div className="header">
                <Link to="/">
                    <div className="header-title">
                        <h2>-Seeds Surfers-</h2>
                    </div>
                </Link>
                <h4>with cova.amigo</h4>
                <Link to="/account">
                <button className="settingButton">
                    <img src="image/setting-icon.png" className="icon"/>
                </button>
                </Link>
            </div>
    )
}

export default Header;