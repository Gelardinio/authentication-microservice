import React, { useState } from 'react';
import '../App.css';
import LoginInput from '../Components/logincInput';
import GetTiming from '../Functions/keystrokeTiming';
import GetCursorTiming from '../Functions/cursorTiming';
import SubmitFunc from '../Functions/submitButtonFunc';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const LoginPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mouseMove, setMouseMove] = useState([]);
  const [keyTrackUser, setKeyTrackUser] = useState([]);
  const [keyTrackPassword, setKeyTrackPassword] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = await SubmitFunc(username, password, mouseMove, keyTrackUser, keyTrackPassword);
      navigate('/mainPage', {
        state: {
            data: data.data,
            graphDetails: data.graphDetails,
            browserData: data.browserData,
        }
      });
    } catch (error) {
      console.error('Error occurred during submission:', error);
    }
  };
  
  return (
    <div className="App" onMouseMove={GetCursorTiming(mouseMove, setMouseMove)}>
      <header className="App-header">
        <p>
          Sample Login
        </p>
        <LoginInput placeholder="Username"  onChange={GetTiming(keyTrackUser, setUsername, setKeyTrackUser, false)}/>
        <LoginInput placeholder="Password" onChange={GetTiming(keyTrackPassword, setPassword, setKeyTrackPassword, true)}/>
        <br></br>
        <Button variant="contained" onClick={async () => handleSubmit()}>Login</Button>
      </header>
    </div>
  );
}

export default LoginPage;
