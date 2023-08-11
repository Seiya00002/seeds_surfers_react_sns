import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";


function Main() {

    return(
        <BrowserRouter>
            <div>
                <Route path="/" Component={Login} />
                <Route path="/home" Component={App} />
            </div>
        </BrowserRouter>
    );
}  

export default Main; 