import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Components/logincInput';

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button placeHolder="Username"  onChange={e => setUsername(e.target.value)}/>
        <Button placeHolder="Password"  onChange={e => setPassword(e.target.value)}/>
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
