import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";

function Main () {

    <BrowserRouter>
        <div>
            <Route exact path="/" Component={SinIn} />
            <Route path="/home" Component={Home} />
        </div>
    </BrowserRouter>

    const SinIn = () => {
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
}

export default Main; 