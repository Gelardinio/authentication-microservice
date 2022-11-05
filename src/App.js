import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginInput from './Components/logincInput';
import GetTiming from './Functions/keystrokeTiming';
import GetCursorTiming from './Functions/cursorTiming';
import SubmitButton from './Components/submitButton';
import SubmitFunc from './Functions/submitButtonFunc';
import { InfoObtain, GetIp } from './Functions/browserInfo';

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mouseMove, setMouseMove] = useState([]);
  const [keyTrack, setKeyTrack] = useState([]);
  const [BrowserInfo, setBrowserInfo] = useState({});

  useEffect(() => {
    InfoObtain(BrowserInfo, setBrowserInfo).then(res => {
      GetIp(BrowserInfo, setBrowserInfo, res);
    });
  }, [])

  return (
    <div className="App" onMouseMove={GetCursorTiming(mouseMove, setMouseMove)}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginInput placeholder="Username"  onChange={GetTiming(username, setUsername, setKeyTrack, false)}/>
        <LoginInput placeholder="Password" onChange={GetTiming(password, setPassword, setKeyTrack, true)}/>
        <SubmitButton onClick={async () => SubmitFunc(username, password, mouseMove, keyTrack, BrowserInfo)}/>
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

export default App;
