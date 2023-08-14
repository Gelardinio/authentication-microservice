const GetCursorTiming = (positionArr, changePosition) => {

    return function (e) {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const milliseconds = currentTime.getMilliseconds();
        
        const { clientX, clientY } = e;
        changePosition([...positionArr, { clientX, clientY, hours, minutes, seconds, milliseconds }]);
    }
};

export default GetCursorTiming;
