import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Account from './Components/Account';
import SignIn from './Components/signIn';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/account' element={<Account />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();