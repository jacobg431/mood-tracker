import { useState, useEffect } from 'react';
import { getUser, resetAffirmations, getAllMoods } from '../scripts/fetchCalls';
import positiveImg from '../images/positive.png';

export default function Selector(props) {
    const { apiUrl, apiKey, userId, username } = props;
    const [affirmations, setAffirmations] = useState([]);
    const [moods, setMoods] = useState([]);

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

    function findMostFrequentCategory(allSelectedCategories){
        const frequencyMap = allSelectedCategories.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});
        const mostFrequentCategory = Object.keys(frequencyMap).reduce((a, b) => {
            return frequencyMap[a] > frequencyMap[b] ? a : b;
        });
        return mostFrequentCategory;
    
    }

    function findOverallMood() {
        if(affirmations.length===0){
            return ""; 
        }

        let allSelectedCategories = [];
        affirmations.map((moodIdArray, i) =>
            moodIdArray.map((moodId) => {
                allSelectedCategories.push(findCategoryById(moodId));
            }),
        );

        return findMostFrequentCategory(allSelectedCategories); 
        
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
                <div className="bg-fuchsia-100 p-16 flex flex-col justify-between items-center items-stretch min-h-full rounded-3xl">
                    <div className="text-rose-800 text-lg font-semibold">
                        Your overall mode has beeen: {affirmations && moods && findOverallMood()}
                    </div>
                    <div>
                        <img className="max-h-120" src={positiveImg} alt="" />
                    </div>
                    <div>Quote kommer her</div>
                </div>
            </div>
        </>
    );
}
