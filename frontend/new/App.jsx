import React, { useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div>
      <h1>React Authentication Example</h1>
      {isLoggedIn ? (
        <>
          <p>Welcome, {username}!</p>
          <Logout onLogout={handleLogout} />
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <Register />
        </>
      )}
    </div>
  );
}

export default App;