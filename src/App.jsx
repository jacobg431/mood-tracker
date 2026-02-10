import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Header from './components/header.jsx';

function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StartupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/selector" element={<SelectorPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
