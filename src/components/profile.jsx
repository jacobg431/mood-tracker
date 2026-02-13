import { useState, useEffect } from 'react';
import { getUser, resetAffirmations, getAllMoods } from '../scripts/fetchCalls';
import positiveImg from '../images/positive.png';
import negativeImg from '../images/negative.png';
import neutralImg from '../images/neutral.png';
import quotes from '../data/quotes.json';

export default function Selector(props) {
    const { apiUrl, apiKey, userId, username } = props;
    const [affirmations, setAffirmations] = useState([]);
    const [moods, setMoods] = useState([]);
    const [randomQuote, setRandomQuote] = useState(null);
    const overallMood = affirmations.length && moods.length ? findOverallMood() : '';

    const moodImgMap = {
        Positive: positiveImg,
        Negative: negativeImg,
        Neutral: neutralImg,
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Load moods first
                const moodsData = await getAllMoods(apiUrl);
                setMoods(moodsData);

                // 2. Then load user
                const user = await getUser(apiUrl, userId);
                setAffirmations(user.affirmations);

                if (!overallMood) {
                    setRandomQuote(null);
                    return;
                }

                const filtered = quotes.filter((q) => q.category === overallMood);
                if (filtered.length === 0) {
                    setRandomQuote(null);
                    return;
                }

                const idx = Math.floor(Math.random() * filtered.length);
                setRandomQuote(filtered[idx]);
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };

        loadData();
    }, [apiUrl, userId, overallMood]);

    function findEmojiById(moodId) {
        const foundMood = moods.find((mood) => mood.id === moodId);
        const emoji = foundMood.emoji;
        return emoji;
    }

    const onClearHistory = async () => {
        try {
            await resetAffirmations(apiUrl, apiKey, userId, username);
            setAffirmations([]);
        } catch (err) {
            console.error('Failed to reset affirmations:', err);
        }
    };

    function findCategoryById(moodId) {
        const foundMood = moods.find((mood) => mood.id === moodId);
        const category = foundMood.category;
        return category;
    }

    function findMostFrequentCategory(allSelectedCategories) {
        const frequencyMap = allSelectedCategories.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});

        const entries = Object.entries(frequencyMap);
        if (entries.length === 0) return '';

        const maxCount = Math.max(...entries.map(([, count]) => count));

        const topCategories = entries.filter(([, count]) => count === maxCount).map(([category]) => category);

        if (topCategories.length > 1) return 'Neutral';

        return topCategories[0];
    }

    function findOverallMood() {
        if (affirmations.length === 0) return '';

        const allSelectedCategories = affirmations.flatMap((moodIdArray) =>
            moodIdArray.map((moodId) => findCategoryById(moodId)),
        );

        return findMostFrequentCategory(allSelectedCategories);
    }

    return (
        <>
            <div className="h-full flex gap-5 items-center justify-center bg-neutral-100 p-24 items-stretch">
                <div className="bg-fuchsia-100 p-16 flex flex-col justify-between items-center items-stretch min-h-full rounded-3xl gap-4">
                    <h3 className="text-xl font-sans font-bold text-rose-800">Mood Log History</h3>
                    <div className="h-full justify-start flex flex-col gap-2">
                        {affirmations ?
                            affirmations.map((moodIdArray, i) => (
                                <div className="text-xl" key={i}>
                                    {moodIdArray.map((moodId) => findEmojiById(moodId))}
                                </div>
                            ))
                            :
                            <div className ="text-xl"> </div>}
                    </div>
                    <button
                        onClick={onClearHistory}
                        className="text-fuchsia-100 bg-fuchsia-300 flex items-center gap-2 rounded-lg p-3 text-md hover:cursor-pointer font-medium transition hover:bg-rose-300 hover:text-white"
                    >
                        Clear Mode Log History
                    </button>
                </div>
                <div className="bg-fuchsia-100 p-16 flex flex-col gap-2 justify-between items-center items-stretch min-h-full rounded-3xl max-w-100">
                    <div className="text-rose-800 text-lg font-semibold">
                        Your overall mode has beeen: {overallMood || "Unknown"}
                    </div>
                    <div>
                        <img
                            className="max-h-120"
                            src={moodImgMap[overallMood] || neutralImg}
                            alt=""
                        />
                    </div>
                    <div>
                        {randomQuote ? (
                            <>
                                <div className="text-lg italic">"{randomQuote.quote}"</div>
                                <div className="text-sm mt-2">– {randomQuote.author}</div>
                            </>
                        ) : (
                            <div> </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
