import React, { useState } from 'react';
import { getOrCreateUserByUsername } from '../scripts/fetchCalls';
import { useNavigate } from "react-router";

export default function Login(props) {
    const onSetUserName = props.onSetUserName; 
    const apiKey = props.apiKey; 
    const baseUrl = props.apiUrl;
    const navigate = useNavigate();

    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        const user = await getOrCreateUserByUsername(baseUrl, apiKey, trimmed);

        if (!user) {
            console.error('Could not create new user.');
            return;
        }

        onSetUserName(user.username);

        navigate("/profile"); 

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100">
            <form onSubmit={handleSubmit} className="bg-emerald-600 p-6 rounded-lg shadow-md w-80">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md mb-4 outline-none text-gray-800"
                />
                <button
                    type="submit"
                    className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-md transition"
                >
                    Start
                </button>
            </form>
        </div>
    );
}
