import React, { Dispatch, SetStateAction } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import App from "./App";
import Login from "./Login";


function Main() {
    const [user] = useAuthState(auth);
    const isLoggedIn = !!user; //ログイン状態 true or false

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                
                {isLoggedIn && (
                    <Route path="/home" element={<App />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}  

export default Main; 