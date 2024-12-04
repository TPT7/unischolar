import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [user_id, setUserid] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('user_id');

    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserid(parseInt(storedUserId)); 
    } else {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users'); 
          if (response.data.length > 0) {
            setUsername(response.data[0].username); 
            setUserid(response.data[0].user_id); 
            
           
            localStorage.setItem('username', response.data[0].username); 
            localStorage.setItem('user_id', response.data[0].user_id.toString()); 
          }
        } catch (err) {
          console.log('Error fetching users');
        }
      };
      fetchUsers();
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    setUsername('');
    setUserid('');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        {username ? (
          <Link >Welcome {username}</Link> 
        ) : (
          <Link>Welcome</Link> 
        )}
        <Link to="/">Home</Link>
        <Link to="/history">Questions</Link>
        <Link to="/users">Users</Link>
        {username && ( 
          <Link to="/login" onClick={handleLogout}>Logout</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
