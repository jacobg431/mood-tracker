import React, { useState } from 'react';
import { getOrCreateUserByUsername } from '../scripts/fetchCalls';
import { useNavigate } from 'react-router';

export default function Login(props) {
    const onSetUserData = props.onSetUserData;
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

        onSetUserData({
            userId: user.id,
            userName: user.username,
            affirmations: user.affirmations,
        });

        navigate('/profile');
    };

    const loginPageStyle = "bg-neutral-100 flex h-full items-center justify-center";
    const formStyle = "max-w-5xl rounded-3xl border border-white/60 bg-green-100/70 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur-xl";
    const innerPaddingClass = 'flex flex-col gap-8 p-8 sm:p-10';
    const headingStyle = 'text-2xl sm:text-3xl font-bold text-sky-800';
    const inputWrapperStyle = 'mt-3 rounded-2xl border border-cyan-100 bg-white/70 px-4 py-4 shadow-sm text-xl sm:text-2xl';
    const inputFieldStyle = "flex items-center justify-center rounded-md outline-none text-gray-800";
    const buttonStyle = 'cursor-pointer rounded-2xl px-5 py-4 text-xl sm:text-2xl font-semibold ' +
        'text-white shadow-lg transition bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 ' +
        'hover:from-cyan-500 hover:via-teal-500 hover:to-emerald-500 active:scale-[0.99] ' +
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/70'


    return (
        <div className={loginPageStyle}>
            <form onSubmit={handleSubmit} className={formStyle}>
                <div className={innerPaddingClass}>

                    <h3 className={headingStyle}>Login | Register</h3>

                    <div className={inputWrapperStyle}>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputFieldStyle}
                        />
                    </div>
                    <button
                        type="submit"
                        className={buttonStyle}
                    >
                        Start
                    </button>
                </div>
            </form>
        </div>
    );
}
