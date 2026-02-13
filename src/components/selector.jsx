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

    const layoutClass =
        'min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-slate-50 to-cyan-50 px-6 py-10';

    const formClass =
        'relative w-full max-w-5xl rounded-3xl border border-white/60 bg-green-100/70 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur-xl';

    const innerPaddingClass = 'p-8 sm:p-10';

    const headerWrapperClass = 'mb-8 flex flex-col gap-2';
    const titleClass = 'text-4xl sm:text-5xl font-extrabold tracking-tight text-sky-800';
    const subtitleClass = 'text-slate-600 text-lg sm:text-xl';

    const moodsContainerClass =
        'rounded-2xl border border-cyan-500 bg-gradient-to-b from-cyan-50/70 to-white/40 p-5 sm:p-6';

    const moodsListClass = 'flex flex-row flex-wrap gap-3 sm:gap-4';

    const footerWrapperClass = 'mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between';

    const currentMoodRowClass = 'flex items-baseline gap-3';
    const currentMoodTitleClass = 'text-2xl sm:text-3xl font-bold text-sky-800';
    const currentMoodCountClass = 'text-slate-500 text-sm sm:text-base';

    const selectedBoxClass = 'mt-3 rounded-2xl border border-cyan-100 bg-white/70 px-4 py-3 shadow-sm';

    const selectedListWrapperClass = 'max-h-24 overflow-y-auto';
    const selectedListClass = 'flex flex-wrap gap-2';
    const placeholderClass = 'text-slate-400 text-lg';

    const selectedMoodClass =
        'inline-flex items-center justify-center rounded-xl bg-cyan-50 px-2.5 py-1 text-2xl shadow-[0_6px_18px_-12px_rgba(14,116,144,0.6)]';

    const hiddenInputClass = 'sr-only';

    const submitButtonClass =
        'self-end group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-xl sm:text-2xl font-semibold ' +
        'text-white shadow-lg transition bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 ' +
        'hover:from-cyan-500 hover:via-teal-500 hover:to-emerald-500 active:scale-[0.99] ' +
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/70';

    const submitTextClass = 'transition group-hover:translate-x-[1px]';
    const submitArrowClass = 'text-white/90 transition group-hover:translate-x-1';

    return (
        <>
            <div className={layoutClass}>
                <form onSubmit={handleSubmit} className={formClass}>
                    <div className={innerPaddingClass}>
                        <div className={headerWrapperClass}>
                            <h1 className={titleClass}>Mood selector</h1>
                            <p className={subtitleClass}>How do you feel today?</p>
                        </div>

                        <div className={moodsContainerClass}>
                            <div className={moodsListClass}>
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

                        <div className={footerWrapperClass}>
                            <div className="flex-1">
                                <div className={currentMoodRowClass}>
                                    <span className={currentMoodTitleClass}>Current Mood</span>
                                    <span className={currentMoodCountClass}>({selectedMoods.length} selected)</span>
                                </div>

                                <div className={selectedBoxClass}>
                                    <div className={selectedListWrapperClass}>
                                        <div className={selectedListClass}>
                                            {selectedMoods.length === 0 ? (
                                                <span className={placeholderClass}>
                                                    Select one or more moods above…
                                                </span>
                                            ) : (
                                                selectedMoods.map((m) => (
                                                    <span key={m.id} className={selectedMoodClass} title={m.name}>
                                                        {m.emoji}
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    <input
                                        className={hiddenInputClass}
                                        id="moodEntry"
                                        disabled
                                        value={moodEmojiString}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <button type="submit" className={submitButtonClass}>
                                <span className={submitTextClass}>Submit</span>
                                <span aria-hidden="true" className={submitArrowClass}>
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
