import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import ReactSlider from 'react-slider';
import './FilterPopup.css';


function FilterPopup({ isOpen, onClose, onApplyFilters, maxPrice }) {
    const [nameFilter, setNameFilter] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [seller, setSeller] = useState('');
    const [priceRange, setPriceRange] = useState([0, maxPrice]);

    const FullStatus = {
        "AC": "Active",
        "CC": "Canceled",
        "FI": "Finished",
        "NO": "No offers",
        "OB": "Obsoleted",
    }

    useEffect(() => {
        setPriceRange([0, maxPrice]);
    }, [maxPrice]);

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };

    const handleStatusChange = (status) => {
        const updatedStatuses = selectedStatuses.includes(status)
            ? selectedStatuses.filter(s => s !== status)
            : [...selectedStatuses, status];
        setSelectedStatuses(updatedStatuses);
    };

    const handleSellerChange = (event) => {
        setSeller(event.target.value);
    };

    const handleNameChange = (event) => {
        setNameFilter(event.target.value);
    };

    const handleApplyFilters = () => {
        onApplyFilters({ nameFilter, priceRange, selectedStatuses, seller });
        onClose();
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="Modal"
            overlayClassName="Overlay"
        >
            <h3>Filter Auctions</h3>
            <div className="filter-row">
                <label>Name:</label>
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={handleNameChange}
                />
            </div>
            <div className="filter-row">
                <label>Status:</label>
                {Object.entries(FullStatus).map(([code, label]) => (
                    <div className="filter-row">
                    <label key={code}>
                        <input
                            type="checkbox"
                            checked={selectedStatuses.includes(code)}
                            onChange={() => handleStatusChange(code)}
                        />
                        {label}
                    </label>
                    </div>
                ))}
            </div>
            <div className="filter-row">
                <label>Seller:</label>
                <input
                    type="text"
                    placeholder="Filter by seller"
                    value={seller}
                    onChange={handleSellerChange}
                />
            </div>
            <div className="filter-row">
                <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                <div className="range-slider-container">
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        pearling
                        minDistance={10}
                        min={0}
                        max={maxPrice}
                    />
                </div>
            </div>
            <button onClick={handleApplyFilters}>Apply Filters</button>
            <button onClick={onClose}>Close</button>
        </ReactModal>
    );
}

export default FilterPopup;
