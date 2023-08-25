import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Account from './Components/Account';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={App} />
        <Route path='/account' Component={Account} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();