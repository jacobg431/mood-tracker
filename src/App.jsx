import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Header from './components/header.jsx';
import Login from './components/login.jsx';

function App() {
    const [userName, setUsername] = useState('');

    return (
        <>
            <Header userName={userName} onSetUserName={setUsername} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" />
                    <Route path="/login" element={<Login onSetUserName={setUsername} userName={userName} />}  />
                    <Route path="/selector" />
                    <Route path="/profile" />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
