import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Header from './components/header.jsx';
import Login from './components/login.jsx';
import NotFound from './components/notFound.jsx';
import Selector from './components/selector.jsx';

function App() {
    const [userData, setUserData] = useState(() => {
        try {
            const stored = localStorage.getItem('userData');
            return stored ? JSON.parse(stored) : { userId: -1, userName: '', affirmations: [] };
        } catch {
            return { userId: -1, userName: '', affirmations: [] };
        }
    });

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    const isLoggedIn = userData.userId > 0;

    const apiUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    return (
        <BrowserRouter>
            <Header userName={userData.userName} onSetUserData={setUserData} />

            <Routes>
                <Route
                    path="/login"
                    element={
                        <Login
                            onSetUserData={setUserData}
                            userName={userData.userName}
                            apiUrl={apiUrl}
                            apiKey={apiKey}
                        />
                    }
                />

                <Route
                    path="/selector"
                    element={
                        isLoggedIn ? <Selector onSetUserData={setUserData} userId={userData.userId} apiUrl={apiUrl} apiKey={apiKey} /> : <Navigate to="/login" replace />
                    }
                />

                <Route path="/profile" element={isLoggedIn ? <div>Profile</div> : <Navigate to="/login" replace />} />

                <Route path="/" element={<Navigate to={isLoggedIn ? '/selector' : '/login'} replace />} />

                <Route path="*" element={isLoggedIn ? <NotFound /> : <Navigate to={'/login'} replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
