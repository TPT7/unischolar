import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [user_id, setUserid] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    // Check if there's a username in localStorage when the component mounts
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('user_id');

    if (storedUsername && storedUserId) {
      // If data is in localStorage, set it in state
      setUsername(storedUsername);
      setUserid(parseInt(storedUserId)); // Parse user_id as integer
    } else {
      // Optionally, fetch users from the API if there's no username stored
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users'); // Adjust URL based on your backend API
          if (response.data.length > 0) {
            // Assuming you want the first user, or you can implement a specific user fetch based on session or auth
            setUsername(response.data[0].username); // Set the first user's username
            setUserid(response.data[0].user_id); // Set the first user's ID (make sure to use user_id)
            
            // Store username and user_id in localStorage for future reference
            localStorage.setItem('username', response.data[0].username); 
            localStorage.setItem('user_id', response.data[0].user_id.toString()); // Convert user_id to string before storing
          }
        } catch (err) {
          console.log('Error fetching users');
        }
      };
      fetchUsers();
    }
  }, []); // Empty dependency array to run only once when the component mounts

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    // Reset state
    setUsername('');
    setUserid('');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        {username ? (
          <Link >Welcome {username}</Link> // Display username if available
        ) : (
          <Link>Welcome</Link> // Default text if no username is found
        )}
        <Link to="/">Home</Link>
        <Link to="/history">Questions</Link>
        <Link to="/users">Users</Link>
        {username && ( // Only show logout button if the user is logged in
          <Link to="/login" onClick={handleLogout}>Logout</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
