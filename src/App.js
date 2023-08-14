import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Containers/Login';
import TitleBar from './Containers/MainScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mainPage" element={<TitleBar />} />
      </Routes>
    </Router>
  );
}

export default App;
