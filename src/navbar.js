import React from'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/login"> Welcome Unischolar</Link>
        <Link to="/">Home</Link>
        <Link to="/history">Questions</Link>
        <Link to="/users">Users</Link>
      </div>
  </div>
  );
};

export default Navbar;
