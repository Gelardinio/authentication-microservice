import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginInput from './Components/logincInput';
import GetTiming from './Functions/keystrokeTiming';
import GetCursorTiming from './Functions/cursorTiming';
import SubmitButton from './Components/submitButton';
import SubmitFunc from './Functions/submitButtonFunc';

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mouseMove, setMouseMove] = useState([]);

  //Need to fix rerender issues with onChange

  return (
    <div className="App" onMouseMove={GetCursorTiming(mouseMove, setMouseMove)}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginInput placeholder="Username"  onChange={GetTiming(username, setUsername, false)}/>
        <LoginInput placeholder="Password" onChange={GetTiming(password, setPassword, true)}/>
        <SubmitButton onClick={SubmitFunc(mouseMove)}/>
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
