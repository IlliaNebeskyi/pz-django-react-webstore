import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';
import axios from "axios";


Modal.setAppElement('#root'); // Set the root element for accessibility

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [activeItem, setActiveItem] = useState("");
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/auctions');
            const data = await response.json();
            setAuctions(data)
        };
        fetchData();
    }, []);

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
                        <h1>List of auctions</h1>
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Desc</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Seller</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                auctions.map((auction, key) =>
                                    <tr key={key}>
                                        <td className='table-data'>{auction.title}</td>
                                        <td className='table-data'>{auction.body}</td>
                                        <td className='table-data'>{auction.status}</td>
                                        <td className='table-data'>{auction.price}</td>
                                        <td className='table-data'>{auction.seller_name}</td>
                                        <td className='table-data'>Chat button</td>
                                        {auction.seller_name === username ? (
                                        <td className='table-data'>Cancel button</td>
                                            ) : (
                                        <td className='table-data'>Buy button</td>
                                            )}
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

//<td className='table-data'><img width='20px' height='10px' src={country.media.flag} alt="flag"/></td>
export default App;
