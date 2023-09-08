import React from "react";
import { Link } from "react-router-dom"; 
import './Header.css';

function Header() {

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