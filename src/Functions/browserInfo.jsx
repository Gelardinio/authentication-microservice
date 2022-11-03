import { useEffect } from 'react';
import axios from 'axios'
import Bowser from "bowser";

const InfoObtain = (browserInfo, setBrowserInfo) => {
    useEffect(() => {
        setBrowserInfo(Bowser.parse(window.navigator.userAgent));
    }, [])
}   

const GetIp = async (browserInfo, setBrowserInfo, ipFetched, ipUpdateFetch) => {
    if(!ipFetched) {
        const res = await axios.get('http://ip-api.com/json') 
        let temp = browserInfo
        temp['ip'] = res.data 
        setBrowserInfo(temp);
        ipUpdateFetch(true);
        console.log(temp)
    } 
}

export { InfoObtain, GetIp } 