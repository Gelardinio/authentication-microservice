import { useEffect } from 'react';

const GetTiming = (currState, stateChangeFunc, keyTrackFunc, isPass) => {
    const dateTime = new Date();

    useEffect(() => {
        keyTrackFunc([...currState, {keyTrackFunc, dateTime, isPass}])
    }, [currState])

    return function (e) {
        stateChangeFunc(e.target.value)
    }
};

export default GetTiming;