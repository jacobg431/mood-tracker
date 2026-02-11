import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Header from './components/header.jsx';
import Login from './components/login.jsx';
import NotFound from './components/notFound.jsx';

function App() {
    const [userName, setUsername] = useState(() => {
        return localStorage.getItem('username') || '';
    });

    const apiUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    const isLoggedIn = !!userName;

    useEffect(() => {
        if (userName) {
            localStorage.setItem('username', userName);
        } else {
            localStorage.removeItem('username');
        }
    }, [userName]);

    return (
        <BrowserRouter>
            <Header userName={userName} onSetUserName={setUsername} />

            <Routes>
                <Route
                    path="/login"
                    element={<Login onSetUserName={setUsername} userName={userName} apiUrl={apiUrl} apiKey={apiKey} />}
                />

                <Route path="/selector" element={isLoggedIn ? <div>Selector</div> : <Navigate to="/login" replace />} />

                <Route path="/profile" element={isLoggedIn ? <div>Profile</div> : <Navigate to="/login" replace />} />

                <Route path="/" element={<Navigate to={isLoggedIn ? '/selector' : '/login'} replace />} />

                <Route path="*" element={isLoggedIn ? <NotFound /> : <Navigate to={'/login'} replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
