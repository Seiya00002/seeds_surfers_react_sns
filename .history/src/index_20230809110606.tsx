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


function RootComponent() {
  const [user] = useAuthState(auth);
  const isLoggedIn = !!user;
  const navigate = useNavigate(); // useNavigateをここで使用

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={isLoggedIn ? <App /> : <Navigate to="/" />}
          />
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