import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Containers/Login';
import MainPage from './Containers/mainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
