import React from "react";
import './Header.css';

function Header() {
    return(
        <div className="header">
            <h2>Seeds Surfers</h2>
            {/* <h3>Produced by cova.amigo</h3> */}
            <a href="/account">Setting</a>
        </div>
    )
}

export default Header;