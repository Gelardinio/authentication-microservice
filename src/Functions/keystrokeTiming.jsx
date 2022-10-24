import { useEffect } from 'react';

const GetTiming = (currState, stateChangeFunc, isPass) => {
    const dateTime = new Date();
    let currentKey = 0;

    useEffect(() => {
        if (localStorage.getItem("keyVal") == null) {
            localStorage.setItem("keyVal", 0);
        } else {
            currentKey = localStorage.getItem("keyVal");
            localStorage.setItem("keyVal", ++currentKey);
        }
        localStorage.setItem(++currentKey, JSON.stringify({dateTime, currState, isPass}));
    }, [currState])

    return function (e) {
        stateChangeFunc(e.target.value)
    }
};

export default GetTiming;