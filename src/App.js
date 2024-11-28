import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import HomePage from './home';
import HistoryPage from './history';
import SignUpPage from './signup';
import LoginPage from './login';
import './App.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
      </div>
      <div className="profile">
        <div className="profile-details">
          <p>Uni Scholar</p>
          <a href="/login" id="logout">Logout</a>
        </div>
        <img src="/img/profile.png" alt="Profile Icon" />
      </div>
    </div>
  );
};

const App = () => {
  const location = useLocation();

  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;

