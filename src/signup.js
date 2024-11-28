import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { username, password });
      if (response.status === 201) {
        // Redirect to the login page upon successful signup
        navigate('/login');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Uni Scholar Sign Up Form</h2>
      <input
        type="text"
        id="usernames"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        id="passwords"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleSignup}>Signup</button>
      <a href="./login">Login with your credentials</a>
    </div>
  );
};

export default SignUpPage;
