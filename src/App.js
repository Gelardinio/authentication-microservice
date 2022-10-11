import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginInput from './Components/logincInput';
import GetTiming from './Functions/keystrokeTiming';
import SubmitButton from './Components/submitButton';

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Need to fix rerender issues with onChange

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginInput placeholder="Username"  onChange={GetTiming(setUsername)}/>
        <LoginInput placeholder="Password"/>
        <SubmitButton/>
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
