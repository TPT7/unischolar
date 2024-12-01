import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if there's a username in localStorage when the component mounts
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Optionally, fetch users from the API if there's no username stored
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users'); // Adjust URL based on your backend API
          if (response.data.length > 0) {
            setUsername(response.data[0].username); // Set the first user's username
            localStorage.setItem('username', response.data[0].username); // Store in localStorage
          }
        } catch (err) {
          console.log('Error fetching users');
        }
      };
      fetchUsers();
    }
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="navbar">
      <div className="nav-links">
        {username ? (
          <Link to="/login">Welcome {username}</Link> // Display username if available
        ) : (
          <Link to="/login">Welcome</Link> // Default text if no username is found
        )}
        <Link to="/">Home</Link>
        <Link to="/history">Questions</Link>
        <Link to="/users">Users</Link>
      </div>
    </div>
  );
};

export default Navbar;
