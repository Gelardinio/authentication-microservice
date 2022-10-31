import { useEffect } from 'react';
import axios from 'axios'
import Bowser from "bowser";

const InfoObtain = async (browserInfo, setBrowserInfo) => {
    useEffect(() => {
        setBrowserInfo(Bowser.parse(window.navigator.userAgent));
        console.log(Bowser.parse(window.navigator.userAgent))
        //Need custom hook
        //const res = await axios.get('https://geolocation-db.com/json/')
        //setBrowserInfo([...browserInfo, res.data])
    }, [])
}   

export default InfoObtain;  