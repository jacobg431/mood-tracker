import { useState, useEffect } from 'react';
import MoodOption from './moodOption';
import { getAllMoods, updateAffirmations } from '../scripts/fetchCalls';
import { useNavigate } from 'react-router';

export default function Selector(props) {
    const { apiUrl, apiKey, userId, username } = props;
    const navigate = useNavigate();

    const [moods, setMoods] = useState([]);
    const [selectedMoods, setSelectedMoods] = useState([]);

    useEffect(() => {
        const loadMoods = async () => {
            try {
                const data = await getAllMoods(apiUrl);
                setMoods(data);
            } catch (error) {
                console.error('Failed to fetch moods:', error);
            }
        };

        loadMoods();
    }, [apiUrl]);

    const handleMoodClick = (mood) => {
        setSelectedMoods((prev) => {
            const alreadySelected = prev.find((m) => m.id === mood.id);

            if (alreadySelected) {
                // Unclick
                return prev.filter((m) => m.id !== mood.id);
            } else {
                // Add
                return [...prev, mood];
            }
        });
    };

    const moodEmojiString = selectedMoods.map((m) => m.emoji).join(' ');
    const selectedMoodIds = selectedMoods.map((m) => m.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAffirmations = selectedMoodIds;

        try {
            await updateAffirmations(apiUrl, apiKey, userId, username, newAffirmations);
            navigate('/profile');
        } catch (err) {
            console.error('Failed to update affirmations:', err);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-slate-50 to-cyan-50 px-6 py-10">
                <form
                    onSubmit={handleSubmit}
                    className="relative w-full max-w-5xl rounded-3xl border border-white/60 bg-green-100/70 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                >
                    <div className="p-8 sm:p-10">
                        <div className="mb-8 flex flex-col gap-2">
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-sky-800 ">
                                Mood selector
                            </h1>
                            <p className="text-slate-600 text-lg sm:text-xl">How do you feel today?</p>
                        </div>

                        <div className="rounded-2xl border border-cyan-500 bg-gradient-to-b from-cyan-50/70 to-white/40 p-5 sm:p-6">
                            <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
                                {moods &&
                                    moods.map((mood) => (
                                        <MoodOption
                                            key={mood.id}
                                            name={mood.name}
                                            emoji={mood.emoji}
                                            category={mood.category}
                                            isSelected={selectedMoods.some((m) => m.id === mood.id)}
                                            onClick={() => handleMoodClick(mood)}
                                        />
                                    ))}
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-2xl sm:text-3xl font-bold text-sky-800">Current Mood</span>
                                    <span className="text-slate-500 text-sm sm:text-base">
                                        ({selectedMoods.length} selected)
                                    </span>
                                </div>

                                <div className="mt-3 rounded-2xl border border-cyan-100 bg-white/70 px-4 py-3 shadow-sm">
                                    <div className="max-h-24 overflow-y-auto">
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMoods.length === 0 ? (
                                                <span className="text-slate-400 text-lg">
                                                    Select one or more moods above…
                                                </span>
                                            ) : (
                                                selectedMoods.map((m) => (
                                                    <span
                                                        key={m.id}
                                                        className="inline-flex items-center justify-center rounded-xl bg-cyan-50 px-2.5 py-1 text-2xl shadow-[0_6px_18px_-12px_rgba(14,116,144,0.6)]"
                                                        title={m.name}
                                                    >
                                                        {m.emoji}
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    <input
                                        className="sr-only"
                                        id="moodEntry"
                                        disabled
                                        value={moodEmojiString}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xl sm:text-2xl font-semibold
                                           text-white shadow-lg transition
                                           bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600
                                           hover:from-cyan-500 hover:via-teal-500 hover:to-emerald-500
                                           active:scale-[0.99]
                                           focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/70"
                            >
                                <span className="transition group-hover:translate-x-[1px]">Submit</span>
                                <span aria-hidden="true" className="text-white/90 transition group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
