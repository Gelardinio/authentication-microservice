import axios from 'axios';
import getUserBrowserData from './Browser';

const url = "http://127.0.0.1:5000/submit";
const url2 = "http://localhost:8080/submit";

var moveData;

const SubmitFunc = async (username, password, mouseMove, keyTrackUser, keyTrackPassword) => {
    const dateTime = new Date();
    const browserData = await getUserBrowserData();

    const sendData = {
        date: dateTime,
        username: username,
        password: password,
        mouseMove: mouseMove,
        keyTrackerUser: keyTrackUser,
        keyTrackPassword: keyTrackPassword,
        browserData: browserData,
    };

    const headers = {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"}
    try {
        //const response = await axios.post(url, sendData, { headers });
        const response2 = await axios.post(url2, mouseMove, { headers });
        moveData = response2.data.exportedData;
        return moveData;
    } catch (e) {
        console.error(e);
    }
};

export default SubmitFunc;
