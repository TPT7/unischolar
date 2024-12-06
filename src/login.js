import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './usercontext'; 

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showBanner, setShowBanner] = useState(false); 
  const [bannerMessage, setBannerMessage] = useState('');  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.status === 200) {
        setUser(response.data.user);
        console.log('Login successful');
        localStorage.setItem('username', username);
        
        setBannerMessage('Login successful!');
        setShowBanner(true);

        setTimeout(() => {
          navigate('/home');
        }, 2000); 

  
        setTimeout(() => {
          setShowBanner(false);
        }, 3000);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setBannerMessage('Login failed, please try again.');
      setShowBanner(true);

      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    }
  };

  return (
    <div className="login-container">
      {showBanner && (
        <div className="banner">
          <p>{bannerMessage}</p>
        </div>
      )}

      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <a href="./signup">Create your account here</a>
    </div>
  );
};

export default LoginPage;
