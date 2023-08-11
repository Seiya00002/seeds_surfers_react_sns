import React from "react";
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
                    <Route path="/home" element={isLoggedIn ? <App /> : <Navigate to="/" />} />                    
                </Routes>
        </BrowserRouter>
    );
}  

export default Main; 