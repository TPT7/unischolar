import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './home';
import HistoryPage from './history';
import SignUpPage from './signup';
import LoginPage from './login';
import Navbar from './navbar';
import { UserProvider } from './usercontext';
import './App.css';

const App = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <UserProvider>
      <div className="app-layout">
        {showNavbar && <Navbar />}
        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
