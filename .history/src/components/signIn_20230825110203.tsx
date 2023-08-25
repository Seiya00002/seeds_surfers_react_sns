import React, { useState, useContext } from "react";
import { signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../AuthContext";
import { auth } from "../firebase";
import "./SignIn.css";

function SignIn() {
    const { user } = useContext(AuthContext);

    

    return(
        <></>
    );
}

export default SignIn;