const getTiming = () => {
    const dateTime = new Date();
    let millisecond = dateTime.getMilliseconds();

    console.log(millisecond);
};

export default getTiming;