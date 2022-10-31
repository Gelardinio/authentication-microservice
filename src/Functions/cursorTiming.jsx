const GetCursorTiming = (positionArr, changePosition) => {
    const dateTime = new Date();

    return function (e) {
        changePosition([...positionArr, [e.clientX, e.clientY, dateTime]])
    }
};

export default GetCursorTiming;