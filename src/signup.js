import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './usercontext'; 

const SignUpPage = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [programme, setProgramme] = useState('');
  const [showBanner, setShowBanner] = useState(false); 
  const [bannerMessage, setBannerMessage] = useState(''); 
  const navigate = useNavigate();

  //function for signing up users in the database
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { username, password, programme });
      if (response.status === 201) {
        setUser(response.data.user);
        console.log('Account created successfully');
        
        //shows banner after successful signup
        setBannerMessage('Account created successfully!');
        setShowBanner(true);

        setTimeout(() => {
          navigate('/login');
        }, 2000); 

        setTimeout(() => {
          setShowBanner(false);
        }, 3000);
      } else {
        console.log('Signup failed');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      
      //shows banner after failed signup
      setBannerMessage('Signup failed, please try again.');
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

      <h2>Sign Up</h2>
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
      <input
        type="text"
        id="programmes"
        placeholder="Programme"
        value={programme}
        onChange={(e) => setProgramme(e.target.value)}
        required
      />
      <button onClick={handleSignup}>Signup</button>
      <a href="./login">Login with your credentials</a>
    </div>
  );
};

export default SignUpPage;
