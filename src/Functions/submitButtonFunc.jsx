const url = "http://127.0.0.1:5000/submit"

const SubmitFunc = async (username, password, mouseMove, keyTrack, browserInfo) => {
    const dateTime = new Date();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(browserInfo)
    };
    fetch(url, requestOptions)  
        .then (res => {
            console.log(browserInfo)
        })
        .catch(function (err) {
            console.log(err)
        })
};

export default SubmitFunc;