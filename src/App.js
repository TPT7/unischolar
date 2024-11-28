import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './home';
import HistoryPage from './history';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="navbar">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/history">History</Link>
        </div>
        <div className="profile">
          <div className="profile-details">
            <p>Uni Scholar</p>
            <a href="login.html" id="logout">Logout</a>
          </div>
          <img src="img/profile.png" alt="Profile Icon" />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
