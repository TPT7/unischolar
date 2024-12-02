import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import HomePage from './home';
import HistoryPage from './history';
import SignUpPage from './signup';
import LoginPage from './login';
import Navbar from './navbar';
import Users from './users';
import { UserProvider } from './usercontext';
import './App.css';

const App = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <UserProvider>
      <div>
        {showNavbar && <Navbar />}
        <Routes>
          {/* Redirect the default route '/' to '/login' */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/home" element={<HomePage />}/>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<Users />} />
        </Routes>
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
