import { useState, useEffect } from 'react';
import { getUser, resetAffirmations } from '../scripts/fetchCalls';

export default function Selector(props) {
    const { apiUrl, apiKey, userId, username } = props;
    const [affirmations, setAffirmations] = useState([]);


     useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await getUser(apiUrl, userId);
                setAffirmations(user.affirmations); 

            } catch (error) {
                console.error('Failed to get user:', error);
            }
        };

        loadUser();
    }, [apiUrl, userId]);

    const onClearHistory = async () => {
        try{
            await resetAffirmations(apiUrl, apiKey, userId, username); 
            setAffirmations([]); 
        }
        catch(err){
            console.error('Failed to reset affirmations:', err);
        }
    }; 
  

    return (
        <>
            <div className="h-full flex items-center justify-center bg-neutral-100 p-32">
               <div className="bg-neutral-300 p-16 flex flex-col justify-between items-center">    
                    <h3 className=''>
                        Mood Log History
                    </h3>
                    <div className="h-full p-16 flex flex-col gap-2">
                        {affirmations &&
                            affirmations.map((emojis, i) => (
                                <div key={i}>
                                    {emojis}
                                </div>
                            ))}
                    </div>
                    <button onClick={onClearHistory} className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                        Clear Mode Log History
                    </button>
               </div>
            </div>
        </>
    );
}
