import React, { Dispatch, SetStateAction } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import App from "./App";
import Login from "./Login";


function Main() {
    const [user] = useAuthState(auth);
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

    return(
        <BrowserRouter>
            
                <Routes>
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                
                {isLoggedIn ?(
                    <Route path="/home" element={<App />} />
                ) : (
                    <Route path="home" element={<Navigate to ="/" />} />
                )}
                </Routes>
            
        </BrowserRouter>
    );
}  

export default Main; 