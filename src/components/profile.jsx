import { useState, useEffect } from 'react';
import { getUser, resetAffirmations } from '../scripts/fetchCalls';
import positiveImg from "../images/positive.png";


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
            <div className="h-full flex gap-5 items-center justify-center bg-neutral-100 p-24 items-stretch">
               <div className="bg-fuchsia-100 p-16 flex flex-col justify-between items-center items-stretch min-h-full rounded-3xl gap-4">    
                    <h3 className='text-xl font-sans font-bold text-rose-800'>
                        Mood Log History
                    </h3>
                    <div className="h-full justify-start flex flex-col gap-2">
                        {affirmations &&
                            affirmations.map((emojis, i) => (
                                <div className="text-xl" key={i}>
                                    {emojis}
                                </div>
                            ))}
                    </div>
                    <button onClick={onClearHistory} className="text-fuchsia-100 bg-fuchsia-300 flex items-center gap-2 rounded-lg p-3 text-md hover:cursor-pointer font-medium transition hover:bg-rose-300 hover:text-white">
                        Clear Mode Log History
                    </button>
               </div>
               <div className="bg-fuchsia-100 p-16 flex flex-col justify-between items-center items-stretch min-h-full rounded-3xl">
                    <div className="text-rose-800 text-lg font-semibold">
                            Your overall mode has beeen: 
                    </div>
                    <div>   
                        <img className="max-h-120" src={positiveImg} alt="" />
                    </div>
                    <div>   
                        Quote kommer her
                    </div>


               </div>
            </div>
        </>
    );
}
