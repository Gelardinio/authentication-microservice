import { useEffect } from 'react';
import axios from 'axios'
import Bowser from "bowser";

const TempSet = async (browserInfo, setBrowserInfo) => {
    const temp = Bowser.parse(window.navigator.userAgent)
    return temp
}

const InfoObtain = async (browserInfo, setBrowserInfo) => {
    return TempSet(browserInfo, setBrowserInfo)
}   

const GetIp = async (browserInfo, setBrowserInfo, currState) => {
    const res = await axios.get('http://ip-api.com/json') 
    currState['ip'] = res.data 
    setBrowserInfo(currState);
}

export { InfoObtain, GetIp } 