import React from "react";
import { Link } from "react-router-dom"; 
import { useContext } from "react";
import { AuthContext, AuthProvider } from './AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from './firebase';

import './Header.css';

function Header() {
    const [user] = useAuthState(auth);

    return(
            <div className="header">
            {/* <div className="userInfo">
                {user ? (
                    <SignOutButton />
                ) : (
                    <SignInButton />
                )}
            </div> */}
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

// function SignInButton() {


//     return (
//         <>
//             <Link to="/signin">
//             <button 
//                 className="signin-button"
//             >
//                 <p>サインイン</p>
//             </button>
//             </Link>
//         </>
//     );
// }

// function SignOutButton() {
//     const { signOut } = useContext(AuthContext);

//     return (
//         <button 
//             className="signout-button"
//             onClick={ async () => { 
//                 await auth.signOut()
//                 signOut();
//             }}
//         >
//             <p>サインアウト</p>
//         </button>
//     );
// }