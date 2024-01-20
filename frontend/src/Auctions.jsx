import React, {useState, useEffect} from 'react';

function Auction({
                     username,
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

    return (
        <div>
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
    )
        ;
}

export default Auction;
