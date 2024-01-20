import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';
import axios from "axios";
import Auction from "./Auctions";


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
            .then(() => {
                setIsLoggedIn(false);
                setUsername('');
                alert("Logged out!");
            });
    };

    const cancelAuction = (id) => {
        axios
            .post("/api/logout")
            .catch(error => {
                alert(error);
            })
            .then(() => {
                setIsLoggedIn(false);
                setUsername('');
                alert("Logged out!");
            });
    }

    const handleLogin = (form) => {
        toggle("Login");

        axios
            .post("/api/login", form)
            .catch(error => {
                alert(error);
            })
            .then(() => {
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
            .then(() => {
                alert("Registered new user!");
            });
    };

    const toggle = (item) => {
        setActiveItem(activeItem === item ? "" : item);
    };

    return (
        <main className="container">
            <div className="row">
                <div className="col-md-6 col-sm-10 col-lg-10 mx-auto p-0">
                    <div className="card p-3">
                        <div>
                            <div className="row">
                                <div className="col-9">
                                    <h1 className="text-black text-uppercase text-center">Web Store</h1>
                                </div>
                                <div className="col-3">
                                    {isLoggedIn ? (
                                        <div className="row">
                                            <p>Welcome, {username}!</p>
                                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                                        </div>
                                    ) : (
                                        <>
                                            <button className="btn btn-primary" onClick={() => toggle("Login")}>Login
                                            </button>
                                            <button className="btn btn-primary" onClick={() => toggle("Register")}>Register
                                            </button>
                                        </>
                                    )}
                                    {isActiveItem("Login") ? (
                                        <Login onSave={handleLogin} toggle={() => toggle("Login")}/>) : null}
                                    {isActiveItem("Register") ? (
                                        <Register onSave={handleRegister} toggle={() => toggle("Register")}/>) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-sm-10 col-lg-10 mx-auto p-0">
                    <div className="card p-3">
                        <Auction username={username}/>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
