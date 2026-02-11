import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Header from './components/header.jsx';
import Login from './components/login.jsx';

function App() {
    const [userName, setUsername] = useState('');
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    return (
        <>
            
            <BrowserRouter>
            <Header userName={userName} onSetUserName={setUsername} />
                <Routes>
                    <Route path="/" />
                    <Route
                        path="/login"
                        element={
                            <Login onSetUserName={setUsername} userName={userName} apiUrl={apiUrl} apiKey={apiKey} />
                        }
                    />
                    <Route path="/selector" />
                    <Route path="/profile" />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
