import React from 'react';

const LoginPage = () => {
  return (
    <div className="login-container">
      <h2>Uni Scholar Login Form</h2>
      <input type="text" id="username" placeholder="Username" required />
      <input type="password" id="password" placeholder="Password" required />
      <button>Login</button>
      <a href="./signup">Create an account here</a>
    </div>
  );
};

export default LoginPage;
