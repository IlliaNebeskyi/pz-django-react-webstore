import React, { useState, useEffect } from 'react';
import axios from "axios";
import Chat from "./Chat";
import AddAuction from "./AddAuction";
import EditAuction from "./EditAuction";
import Chats from "./Chats";
import FilterPopup from './FilterPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import {isMobile} from 'react-device-detect';

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
    const [maxPrice, setMaxPrice] = useState(0);
    const [sortField, setSortField] = useState('price');
    const [sortDirection, setSortDirection] = useState('asc');
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState({
        nameFilter: '',
        priceRange: [0, maxPrice],
        selectedStatuses: [],
        seller: '',
    });

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
                const max = Math.max(...data.map(a => a.price));
                setMaxPrice(max);
                applyFilters({ ...appliedFilters, priceRange: [0, max] })
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
                refreshAuctions()
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

    const filterAuctions = () => {
        return auctions
            .filter(auction => {
                const price = parseFloat(auction.price.replace('$', ''));
                return (
                    price >= appliedFilters.priceRange[0] &&
                    price <= appliedFilters.priceRange[1] &&
                    (appliedFilters.selectedStatuses.length === 0 || appliedFilters.selectedStatuses.includes(auction.status)) &&
                    auction.seller_name.toLowerCase().includes(appliedFilters.seller.toLowerCase()) &&
                    auction.title.toLowerCase().includes(appliedFilters.nameFilter.toLowerCase())
                );
            })
    };

    const applyFilters = (filters) => {
        setAppliedFilters(filters);
    };

    const sortAuctions = (auctionsToSort) => {
        return [...auctionsToSort].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

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
                <div className="d-flex justify-content-between">
                    <button className="btn btn-warning btn-sm" onClick={() => initEditAuction(auction)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => cancelAuction(auction.id)}>Cancel</button>
                </div>
            </td>
        ) : (
            <td className='table-data'>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary btn-sm" onClick={() => initChat(auction)}>Chat</button>
                    <button className="btn btn-success btn-sm" onClick={() => buyAuction(auction.id)}>Buy</button>
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

    const filteredAndSortedAuctions = () => {
        const filtered = filterAuctions();
        return sortAuctions(filtered);
    };

    const sortedAuctions = filteredAndSortedAuctions();

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-md-12 col-lg-12">
                    <h1>List of auctions</h1>
                </div>
                <div className="col-md-12 col-lg-12 text-md-right text-center">
                    {isLoggedIn ? (
                        <div className="d-md-flex justify-content-md-end">
                            <button className="btn btn-primary btn-sm mr-2 mb-2 mb-md-0" onClick={() => toggleAddAuction()}>Create new</button>
                            <button className="btn btn-primary btn-sm" onClick={() => toggleChats()}>My chats</button>
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

            <button className="btn btn-secondary mb-3" onClick={() => setIsFilterPopupOpen(true)}>Filter Auctions</button>

            <FilterPopup
                isOpen={isFilterPopupOpen}
                onClose={() => setIsFilterPopupOpen(false)}
                onApplyFilters={applyFilters}
                maxPrice={maxPrice}
            />

            <div className="table-responsive">
                <table className={isMobile ? "table" : "table table-striped"}>
                    <thead>
                    <tr>
                        <th onClick={() => onHeaderClick('title')}>Name{renderSortIcon('title')}</th>
                        {!isMobile && <th onClick={() => onHeaderClick('body')}>Desc{renderSortIcon('body')}</th>}
                        <th onClick={() => onHeaderClick('status')}>Status{renderSortIcon('status')}</th>
                        <th onClick={() => onHeaderClick('price')}>Price{renderSortIcon('price')}</th>
                        <th onClick={() => onHeaderClick('seller_name')}>Seller{renderSortIcon('seller_name')}</th>
                        {isMobile ? null : (
                            <>
                                {isLoggedIn && <th>Options</th>}
                            </>
                        )
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {isMobile ? (

                            sortedAuctions.map((auction, key) => <>
                                <tr key={key}>
                                    <td className='table-data'>{auction.title}</td>
                                    <td className='table-data'>{FullStatus[auction.status]}</td>
                                    <td className='table-data'>${auction.price}</td>
                                    <td className='table-data'>{auction.seller_name}</td>
                                </tr>
                                <tr>
                                    <td className='table-data' colSpan="2">{auction.body}</td>
                                    <td className='table-data' colSpan="2">
                                        {isLoggedIn ? (
                                            renderButtons(auction)
                                        ) : null}
                                    </td>
                                </tr>
                            </>
                            )
                         ) : (

                            sortedAuctions.map((auction, key) => <>
                                    <tr key={key}>
                                        <td className='table-data'>{auction.title}</td>
                                        <td className='table-data'>{auction.body}</td>
                                        <td className='table-data'>{FullStatus[auction.status]}</td>
                                        <td className='table-data'>${auction.price}</td>
                                        <td className='table-data'>{auction.seller_name}</td>
                                        <td className='table-data'>
                                            {isLoggedIn ? (
                                                renderButtons(auction)
                                            ) : null}
                                        </td>
                                    </tr>
                            </>
                            )
                         )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Auctions;
