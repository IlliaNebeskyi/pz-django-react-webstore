import React, { useState, useEffect } from 'react';
import axios from "axios";
import Chat from "./Chat";
import AddAuction from "./AddAuction";
import EditAuction from "./EditAuction";
import Chats from "./Chats";

function Auctions({
    username,
    isLoggedIn,
}) {
    const [auctions, setAuctions] = useState([]);
    const [isChatActive, setIsChatActive] = useState(false);
    const [isChatsActive, setIsChatsActive] = useState(false);
    const [isAddAuctionActive, setIsAddAuctionActive] = useState(false);
    const [isEditAuctionActive, setIsEditAuctionActive] = useState(false);
    const [activeAuction, setActiveAuction] = useState(false);
    const [sortField, setSortField] = useState('price');
    const [sortDirection, setSortDirection] = useState('asc');


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

    const sortAuctions = () => {
        return [...auctions].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            // Check if the sort field is 'price' and convert to float for comparison
            if (sortField === 'price') {
                aValue = parseFloat(aValue.replace('$', ''));
                bValue = parseFloat(bValue.replace('$', ''));
            }

            if (aValue < bValue) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const onHeaderClick = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const renderSortIcon = (field) => {
        return sortField === field ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : '';
    };


    function renderButtons(auction) {
        return (auction.seller_name === username ? (
            <td className='table-data'>
                <div className="row">
                    <button className="btn btn-warning col-6 d-md-flex"
                        onClick={() => initEditAuction(auction)}>Edit
                    </button>
                    <button className="btn btn-danger col-6 d-md-flex"
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

    const toggleChats = () => {
        setIsChatsActive(!isChatsActive);
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

    const sortedAuctions = sortAuctions();

    return (
        <div>
            <div className="row">
                <div className="col-9">
                    <h1>List of auctions</h1>
                </div>
                <div className="col-3">
                    {isLoggedIn ? (
                        <div>
                            <button className="btn btn-primary col-6 d-md-flex"
                                onClick={() => toggleAddAuction()}>Create new
                            </button>
                            <button className="btn btn-primary col-6 d-md-flex" onClick={() => toggleChats()}>Chat with
                                clients
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
            {isAddAuctionActive ? (
                <AddAuction toggle={toggleAddAuction} onSave={addAuction} />
            ) : null}
            {isEditAuctionActive ? (
                <EditAuction auction={activeAuction} toggle={toggleEditAuction} onSave={editAuction} />
            ) : null}
            {isChatActive ? (
                <Chat auction={activeAuction} username={username} toggle={toggleChat} />
            ) : null}
            {isChatsActive ? (
                <Chats auction={activeAuction} username={username} toggle={toggleChats} />
            ) : null}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={() => onHeaderClick('title')}>Name{renderSortIcon('title')}</th>
                        <th onClick={() => onHeaderClick('body')}>Desc{renderSortIcon('body')}</th>
                        <th onClick={() => onHeaderClick('status')}>Status{renderSortIcon('status')}</th>
                        <th onClick={() => onHeaderClick('price')}>Price{renderSortIcon('price')}</th>
                        <th onClick={() => onHeaderClick('seller_name')}>Seller{renderSortIcon('seller_name')}</th>
                        {isLoggedIn && <th>Options</th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedAuctions.map((auction, key) =>

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
