import { useState, useEffect } from 'react';
import { getUser, resetAffirmations, getAllMoods } from '../scripts/fetchCalls';
import positiveImg from '../images/positive.png';
import negativeImg from '../images/negative.png';
import neutralImg from '../images/neutral.png';
import quotes from '../data/quotes.json';
import { useMemo } from 'react';

export default function Selector(props) {
    const { apiUrl, apiKey, userId, username } = props;
    const [affirmations, setAffirmations] = useState([]);
    const [moods, setMoods] = useState([]);
    const overallMood = findOverallMood();

    const moodImgMap = {
        Positive: positiveImg,
        Negative: negativeImg,
        Neutral: neutralImg,
    };

    const randomQuote = useMemo(() => {
        if (!overallMood) return null;
        return getRandomQuote(overallMood);
    }, [overallMood]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Load moods first
                const moodsData = await getAllMoods(apiUrl);
                setMoods(moodsData);

                // 2. Then load user
                const user = await getUser(apiUrl, userId);
                setAffirmations(user.affirmations);
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };

        loadData();
    }, [apiUrl, userId]);

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

    function getRandomQuote(category) {
        const filteredQuotes = quotes.filter((q) => q.category === category);

        if (filteredQuotes.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        return filteredQuotes[randomIndex];
    }

    return (
        <>
            <div className="h-full flex gap-5 items-center justify-center bg-neutral-100 p-24 items-stretch">
                <div className="bg-fuchsia-100 p-16 flex flex-col justify-between items-center items-stretch min-h-full rounded-3xl gap-4">
                    <h3 className="text-xl font-sans font-bold text-rose-800">Mood Log History</h3>
                    <div className="h-full justify-start flex flex-col gap-2">
                        {affirmations &&
                            affirmations.map((moodIdArray, i) => (
                                <div className="text-xl" key={i}>
                                    {moodIdArray.map((moodId) => findEmojiById(moodId))}
                                </div>
                            ))}
                    </div>
                    <button
                        onClick={onClearHistory}
                        className="text-fuchsia-100 bg-fuchsia-300 flex items-center gap-2 rounded-lg p-3 text-md hover:cursor-pointer font-medium transition hover:bg-rose-300 hover:text-white"
                    >
                        Clear Mode Log History
                    </button>
                </div>
                <div className="bg-fuchsia-100 p-16 flex flex-col justify-between items-center items-stretch min-h-full rounded-3xl max-w-100">
                    <div className="text-rose-800 text-lg font-semibold">
                        Your overall mode has beeen: {affirmations && moods && findOverallMood()}
                    </div>
                    <div>
                        <img
                            className="max-h-120"
                            src={affirmations && moods ? moodImgMap[findOverallMood()] : neutralImg}
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
                            <div>No quote available</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
