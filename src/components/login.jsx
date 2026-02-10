import React, { useState } from 'react';

export default function Login(props) {
    const [name, setName] = useState('');
    const onSetUserName = props.onSetUserName;
    const username = props.userName;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        onSetUserName(name);
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

                <button type="submit" className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-md transition">
                    Start
                </button>
            </form>
        </div>
    );
}
