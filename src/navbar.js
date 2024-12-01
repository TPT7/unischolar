import React from'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="nav-links">
        <NavLink to="/login"> Welcome Unischolar</NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/history">Questions</NavLink>
        <NavLink to="/users">Users</NavLink>
      </div>
  </div>
  );
};

export default Navbar;
