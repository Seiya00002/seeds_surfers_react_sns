import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Login from './Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  const [user] = useAuthState(auth);
  const isLoggedIn = !!user; //ログイン状態 true or false

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();