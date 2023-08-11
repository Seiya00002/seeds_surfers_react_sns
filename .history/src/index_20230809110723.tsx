//index.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Login from './Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 


function HomeRedirect() {
  const [user] = useAuthState(auth);
  const isLoggedIn = !!user;
  
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  } else {
    return null;
  }
}

function RootComponent() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<App />} />
          <Route path="/*" element={<HomeRedirect />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RootComponent />);

reportWebVitals();