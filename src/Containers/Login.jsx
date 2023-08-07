import React, { useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import LoginInput from '../Components/logincInput';
import GetTiming from '../Functions/keystrokeTiming';
import GetCursorTiming from '../Functions/cursorTiming';
import SubmitButton from '../Components/submitButton';
import SubmitFunc from '../Functions/submitButtonFunc';
import { useNavigate } from 'react-router-dom';

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
            data: data,
        }
      });
    } catch (error) {
      console.error('Error occurred during submission:', error);
    }
  };
  
  return (
    <div className="App" onMouseMove={GetCursorTiming(mouseMove, setMouseMove)}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginInput placeholder="Username"  onChange={GetTiming(keyTrackUser, setUsername, setKeyTrackUser, false)}/>
        <LoginInput placeholder="Password" onChange={GetTiming(keyTrackPassword, setPassword, setKeyTrackPassword, true)}/>
        <SubmitButton onClick={async () => handleSubmit()}/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default LoginPage;
