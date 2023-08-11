import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";


function Main() {

    return(
        <BrowserRouter>
            <div>
                <Routes>
                <Route path="/" Component={Login} />
                <Route path="/home" Component={App} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}  

export default Main; 