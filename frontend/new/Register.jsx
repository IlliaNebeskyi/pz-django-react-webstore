import React, { useState } from 'react';
import axios from "axios";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const   handleRegister = (item) => {

    axios
      .post("/api/register", item)
      .catch(error => () => setErrorMessage(error))
      .then(() => setMessage("ok"));
  };

  return (
    <div>
      <h2>Register</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;