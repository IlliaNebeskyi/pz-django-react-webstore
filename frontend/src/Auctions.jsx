import React, {useState, useEffect} from 'react';
import axios from "axios";

function Auction({
                     username,
                     isLoggedIn,
                 }) {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/auctions');
            const data = await response.json();
            setAuctions(data)
        };
        fetchData();
    }, []);

    const cancelAuction = (id) => {
        axios
            .patch("/api/auctions/cancel-auction/" + id + "/")
            .catch((error) => {
                alert(error);
            })
            .then((res) => {
                alert(res.data.message);
            });
    }

    const buyAuction = (id) => {
        axios
            .patch("/api/auctions/buy/" + id + "/")
            .catch(error => {
                alert(error);
            })
            .then(res => {
                alert(res.data.message);
            });
    }

    const editAuction = (id) => {
        axios
            .patch("/api/auctions/edit-auction/" + id + "/")
            .catch(error => {
                alert(error);
            })
            .then(res => {
                alert(res.data.message);
            });
    }

    function renderButtons(auction) {
        return (auction.seller_name === username ? (
                <td className='table-data'>
                    <div className="row">
                        <button className="btn btn-primary col-4 d-md-flex"
                                onClick={() => {
                                }}>Chat
                        </button>
                        <button className="btn btn-warning col-4 d-md-flex"
                                onClick={() => editAuction(auction.id)}>Edit
                        </button>
                        <button className="btn btn-danger col-4 d-md-flex"
                                onClick={() => cancelAuction(auction.id)}>Cancel
                        </button>
                    </div>
                </td>
            ) : (
                <td className='table-data'>
                    <div className="row">
                        <button className="btn btn-primary col-6 d-md-flex" onClick={() => {
                        }}>Chat
                        </button>
                        <button className="btn btn-success col-6 d-md-flex" onClick={() => buyAuction(auction.id)}>Buy
                        </button>
                    </div>
                </td>
            )
        )
    }

    return (
        <div>
            <h1>List of auctions</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Desc</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Seller</th>
                    {isLoggedIn ? (
                        <th>Options</th>
                    ) : null}
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
                            {isLoggedIn ? (
                                renderButtons(auction)
                            ) : null}
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
        ;
}

export default Auction;
