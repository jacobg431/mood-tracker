import { useState, useEffect } from 'react';
import MoodOption from './moodOption';
import { getAllMoods, updateAffirmations } from '../scripts/fetchCalls';

export default function Selector(props) {
    const { apiUrl, apiKey, userId, username } = props;

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
        console.log("Hey")
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAffirmations = moodEmojiString;

        try {
            await updateAffirmations(apiUrl, apiKey, userId, username, newAffirmations);
        } catch (err) {
            console.error('Failed to update affirmations:', err);
        }
    };

    const moodEmojiString = selectedMoods.map((m) => m.emoji).join(' ');

    return (
        <>
            <div className="h-full flex items-center justify-center bg-neutral-100 p-32">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-end bg-neutral-300 p-16">
                    <div className="flex flex-row flex-wrap gap-8">
                        {moods &&
                            moods.map((mood) => (
                                <MoodOption
                                    key={mood.id}
                                    name={mood.name}
                                    emoji={mood.emoji}
                                    category={mood.category}
                                    isSelected={selectedMoods.some(
                                        (m) => m.id === mood.id
                                    )}
                                    onClick={() => handleMoodClick(mood)}
                                />
                            ))}
                    </div>

                    <div className="flex justify-between min-w-full items-center">
                    <div>
                            <span>Current Mood: </span>
                            <input
                                id="moodEntry"
                                disabled
                                value={moodEmojiString}
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
