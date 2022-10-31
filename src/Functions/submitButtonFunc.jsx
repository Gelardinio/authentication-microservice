import axios from 'axios';
const url = "http://127.0.0.1:5000/submit"

const SubmitFunc = async (username, password, mouseMove, keyTrack) => {
    const dateTime = new Date();
    await axios.post(url, {"username": `${username}`, "password": `${password}`, "mouseMove": `${mouseMove}`, "keyTrack": `${keyTrack}`, "date": `${dateTime}`})  
        .then (res => {
            console.log("submitted")
        })
        .catch(function (err) {
            console.log(err)
        })
};

export default SubmitFunc;