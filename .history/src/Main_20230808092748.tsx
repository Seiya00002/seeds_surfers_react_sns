import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";

function Main () {
    return(
        <>
            <Login />
            <App />
        </>
    )
}

export default Main; 