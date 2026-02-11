import { useState } from 'react';
import MoodOption from './moodOption'
import { getAllMoods } from '../scripts/fetchCalls';

export default function Selector(props) {
    const apiUrl = props.apiUrl;
    const apiKey = props.apiKey;

    //const [moods, setMoods] = useState('');

    const moods = getAllMoods(apiUrl);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const trimmed = mood.trim();
    //     if (!trimmed) return;
    // };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-neutral-100">
                <form onSubmit={() => {}}></form>
                <div></div>
                <div>
                    {moods && moods.map(mood => 
                        <MoodOption 
                            key={mood.id} 
                            name={mood.name} 
                            emoji={mood.emoji} 
                            category={mood.category} 
                        />
                    )}
                </div>
                <div>Submit</div>
            </div>
        </>
    );
}
