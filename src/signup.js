import React from 'react';

const SignUpPage = () => {
  return (
    <div className="login-container">
      <h2>Uni Scholar Sign Up Form</h2>
      <input type="text" id="usernames" placeholder="Username" required />
      <input type="password" id="passwords" placeholder="Password" required />
      <button>Signup</button>
      <a href="./login">Login with your credentials</a>
    </div>
  );
};

export default SignUpPage;
