import React, {useEffect, useState} from 'react';
import {Index} from "./game_external/index";

const apis = require('../apis/apis')


export const Game = ({setIsLogin}) => {

    const [isDailyLimit, setIsDailyLimit] = useState({status: true, message: 'Loading', count : -1});
    const [gameStart, setGameStart] = useState(false);



    useEffect( ()=>{
        const fetchData = async () => {
            try {
                // console.log({gameStart})
                const data = await apis.postApiCall('/game/countDailyGame', {})
                // console.log(data.daily_count)
                if(data.daily_count >= 10){
                    // console.log('more then limit')
                    if(data.daily_count !== isDailyLimit.count) {
                        setIsDailyLimit({status: true, message: 'Daily Limit Reached', count: data.daily_count})
                    }
                }else{
                    // console.log('less then limit')
                    if(!isDailyLimit.status === false) {
                        setIsDailyLimit({status: false, message: 'Play Game', count: data.daily_count})
                    }
                }
            } catch (err) {
                // console.log(err)
                if (err === 'Unauthorized' || err === 'Forbidden'){
                    localStorage.removeItem('user');
                    // console.log(err)
                }
                setIsLogin(false);
            }
        }
        fetchData();

    },[isDailyLimit]);

    const handleStartGame = (e) =>{
        e.preventDefault();
        setGameStart(true)
    }

    return (
        <div>
            <h1>Game</h1>
            {gameStart === false}
            { (isDailyLimit.status || !gameStart)?<div>
                    <h3 className="display-3 m-5">{isDailyLimit.message}</h3>
                    {(!isDailyLimit.status)?<button className="btn btn-primary" onClick={handleStartGame}>Start</button>:<></>}
            </div>:
                <Index isDailyLimit={isDailyLimit} setGameStart = {setGameStart} setIsDailyLimit={setIsDailyLimit}/> }
        </div>
    );
};

