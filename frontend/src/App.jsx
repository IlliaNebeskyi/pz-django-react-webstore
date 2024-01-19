import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';
import axios from "axios";


Modal.setAppElement('#root'); // Set the root element for accessibility

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [activeItem, setActiveItem] = useState("");

  const isActiveItem = (item) => {
    return item === activeItem;
  };

  const handleLogout = () => {

    axios
      .post("/api/logout")
      .catch(error => {
        alert(error);
      })
      .then(res => {
        setIsLoggedIn(false);
        setUsername('');
        alert("Logged out!");
      });
  };

  const handleLogin = (form) => {
    toggle("Login");

    axios
      .post("/api/login", form)
      .catch(error => {
        alert(error);
      })
      .then(res => {
        setIsLoggedIn(true);
        setUsername(form.username);
        alert("Welcome!");
      });
  };

  const handleRegister = (form) => {
    toggle("Register");

    axios
      .post("/api/register", form)
      .catch(error => {
        alert(error);
      })
      .then(res => {
        alert("Registered new user!");
      });
  };

  const toggle = (item) => { setActiveItem(activeItem === item ? "" : item); };

  return (
    <main className="container">
          <h1 className="text-white text-uppercase text-center my-4">Web Store</h1>
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="mb-4">
                  {isLoggedIn ? (
                    <>
                      <p>Welcome, {username}!</p>
                      <button  className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary" onClick={() => toggle("Login")}>Login</button>
                      <button className="btn btn-primary" onClick={() => toggle("Register")}>Register</button>
                    </>
                  )}
                  {isActiveItem("Login") ? ( <Login onSave={handleLogin} toggle={() => toggle("Login")}/> ) : null}
                  {isActiveItem("Register") ? ( <Register onSave={handleRegister} toggle={() => toggle("Register")}/> ) : null}
                </div>
              </div>
            </div>
          </div>
        </main>
  );
}

export default App;
