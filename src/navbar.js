import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
      </div>
      <div class="profile">
            <div class="profile-details">
                <p>Uni Scholar</p>
                <a href="/login">Logout</a>
            </div>
            <img src="img/profile.png" alt="Profile Icon"/>
        </div>
    </div>
  );
};

export default Navbar;
