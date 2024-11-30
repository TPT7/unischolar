import React from'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/login">Unischolar</Link>
      </div>
  </div>
  );
};

export default Navbar;
