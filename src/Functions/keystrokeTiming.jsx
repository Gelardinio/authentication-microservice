import React, { useEffect } from 'react';

const GetTiming = (stateChangeFunc) => {
    const dateTime = new Date();
    let millisecond = dateTime.getMilliseconds();
    let minute = dateTime.getMinutes();
    console.log(minute, millisecond);
    let currentKey = 0;

    console.log("exec")

    useEffect(() => {
        if (localStorage.getItem("keyVal") == null) {
            localStorage.setItem("keyVal", 0);
        } else {
            currentKey = localStorage.getItem("keyVal");
            localStorage.setItem("keyVal", ++currentKey);
        }
        localStorage.setItem(++currentKey, JSON.stringify({minute, millisecond}));
        console.log(JSON.parse(localStorage.getItem(currentKey)));
    })

    return function (e) {
        stateChangeFunc(e.target.value)
    }
};

export default GetTiming;