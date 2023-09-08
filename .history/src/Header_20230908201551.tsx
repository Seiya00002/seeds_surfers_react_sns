import React from "react";
import { Link } from "react-router-dom"; 
import './Header.css';

function Header() {

    return(
            <div className="header">
                <h2>SEEDS SURFERS with cova.amigo</h2>
                {/* <h3>Produced by cova.amigo</h3> */}
                <Link to="/account">
                <button className="settingButton">
                    <img src="image/setting-icon.png" className="icon"/>
                </button>
                </Link>
            </div>
    )
}

export default Header;