import React, {useState, useEffect} from 'react';
import axios from "axios";
import Chat from "./Chat";
import AddAuction from "./AddAuction";
import EditAuction from "./EditAuction";

function Auctions({
                      username,
                      isLoggedIn,
                  }) {
    const [auctions, setAuctions] = useState([]);
    const [isChatActive, setIsChatActive] = useState(false);
    const [isAddAuctionActive, setIsAddAuctionActive] = useState(false);
    const [isEditAuctionActive, setIsEditAuctionActive] = useState(false);
    const [activeAuction, setActiveAuction] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            refreshAuctions()
        };
        fetchData();
    }, []);

    const FullStatus = {
        "AC": "Active",
        "CC": "Canceled",
        "FI": "Finished",
        "NO": "No offers",
        "OB": "Obsoleted",
    }

    const refreshAuctions = () => {
        axios
            .get('api/auctions')
            .then(res => {
                const data = res.data;
                setAuctions(data)
            });
    }

    const addAuction = (form) => {
        axios
            .post("api/auctions/add-auction", form)
            .catch((error) => {
                alert(error.response.data.error);
            })
            .then((res) => {
                if (res)
                    alert(res.data.message);
                refreshAuctions();
                toggleAddAuction();
            });
    }

    const cancelAuction = (id) => {
        axios
            .patch("/api/auctions/cancel-auction/" + id + "/")
            .catch((error) => {
                alert(error.response.data.error);
            })
            .then((res) => {
                if (res)
                    alert(res.data.message);
            });
    }

    const buyAuction = (id) => {
        axios
            .patch("/api/auctions/buy/" + id)
            .catch((error) => {
                alert(error.response.data.error);
            })
            .then((res) => {
                if (res)
                    alert(res.data.message);
                refreshAuctions()
            });
    }

    const editAuction = (form) => {
        axios
            .patch("/api/auctions/edit-auction/" + activeAuction.id + "/", form)
            .catch((error) => {
                alert(error.response.data.error);
            })
            .then((res) => {
                if (res)
                    alert(res.data.message);
                refreshAuctions();
                toggleEditAuction();
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
                                onClick={() => initEditAuction(auction)}>Edit
                        </button>
                        <button className="btn btn-danger col-4 d-md-flex"
                                onClick={() => cancelAuction(auction.id)}>Cancel
                        </button>
                    </div>
                </td>
            ) : (
                <td className='table-data'>
                    <div className="row">
                        <button className="btn btn-primary col-6 d-md-flex" onClick={() => initChat(auction)}>Chat
                        </button>
                        <button className="btn btn-success col-6 d-md-flex" onClick={() => buyAuction(auction.id)}>Buy
                        </button>
                    </div>
                </td>
            )
        )
    }

    const initChat = (auction) => {
        setActiveAuction(auction);
        toggleChat()
    };

    const toggleChat = () => {
        setIsChatActive(!isChatActive);
    };

    const toggleAddAuction = () => {
        setIsAddAuctionActive(!isAddAuctionActive);
    };

    const initEditAuction = (auction) => {
        setActiveAuction(auction);
        toggleEditAuction()
    };

    const toggleEditAuction = () => {
        setIsEditAuctionActive(!isEditAuctionActive);
    };

    return (
        <div>
            <div className="row">
                <div className="col-9">
                    <h1>List of auctions</h1>
                </div>
                <div className="col-3">
                    {isLoggedIn ? (
                        <button className="btn btn-primary col-6 d-md-flex" onClick={() => toggleAddAuction()}>Create new
                    </button>) : null}
                </div>
            </div>
            {isAddAuctionActive ? (
                <AddAuction toggle={toggleAddAuction} onSave={addAuction}/>
            ) : null}
            {isEditAuctionActive ? (
                <EditAuction auction={activeAuction} toggle={toggleEditAuction} onSave={editAuction}/>
            ) : null}
            {isChatActive ? (
                <Chat auction={activeAuction} username={username} toggle={toggleChat}/>
            ) : null}

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
                            <td className='table-data'>{FullStatus[auction.status]}</td>
                            <td className='table-data'>${auction.price}</td>
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
    );
}

export default Auctions;
