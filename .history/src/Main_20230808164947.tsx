import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./Login";


function Main() {

    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

    return(
        <BrowserRouter>
            <div>
                <Routes>
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                
                {isLoggedIn ?(
                    <Route path="/home" element={<App />} />
                ) : (
                    <Route path="home" element={<Navigate to ="/" />} />
                )}
                </Routes>
            </div>
        </BrowserRouter>
    );
}  

export default Main; 