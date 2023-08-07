import { useEffect } from 'react';

const GetTiming = (currState, stateChangeFunc, keyTrackFunc, isPass) => {
    return function (e) {
        stateChangeFunc(e.target.value)
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const milliseconds = currentTime.getMilliseconds();
        keyTrackFunc([...currState, { hours, minutes, seconds, milliseconds, isPass }])
    }
};

export default GetTiming;
