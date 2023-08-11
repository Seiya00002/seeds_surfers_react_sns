import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";

function Main () {

    return(
        <BrowserRouter>
            <div>
                <Route path="/" Component={SignIn} />
                <Route path="/home" Component={Home} />
            </div>
        </BrowserRouter>
    );
}

    const SignIn = () => {
        return(
            <>
                <Login />
                <App />
            </>
        )
    }

    const Home = () => {
        return(
            <>
                <App />
            </>
        )
    }


export default Main; 