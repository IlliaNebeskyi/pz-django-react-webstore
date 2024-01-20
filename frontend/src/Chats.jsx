import React, {useState, useEffect} from 'react';
import axios from "axios";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
} from "reactstrap";
import './chat.css';
import Chat from "./Chat";

function Chats({
                   auction,
                   username,
                   toggle
               }) {
    const [chats, setChats] = useState([]);
    const [activeChatAuction, setActiveChatAuction] = useState([]);
    const [clientId, setClientId] = useState([]);
    const [isChatActive, setIsChatActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            refreshChats();
        };
        fetchData();
    }, []);

    const refreshChats = () => {
        axios
            .get('api/chats/')
            .then(res => {
                const data = res.data;
                setChats(data)
            });
    }

    const initChat = (auction, client) => {
        setActiveChatAuction(auction);
        setClientId(client);
        toggleChat()
    };

    const toggleChat = () => {
        setIsChatActive(!isChatActive);
    };

    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Chat with clients</ModalHeader>
            <ModalBody>
                {isChatActive ? (<Chat auction={activeChatAuction} username={username} toggle={toggleChat}
                                       clientId={clientId}/>) : null}
                <table className="table">
                    <thead>
                    <tr>
                        <th>Auction title</th>
                        <th>Client</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        chats.map((chat, key) =>
                            <tr key={key}>
                                <td className='table-data'>{chat.auction_title}</td>
                                <td className='table-data'>{chat.client_name}</td>
                                <td className='table-data'>
                                    <button className="btn btn-primary col-6 d-md-flex"
                                            onClick={() => initChat({
                                                'id': chat.auction,
                                                "seller_name": chat.client_name
                                            }, chat.client)}>Chat now
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => toggle()}>Exit</Button>
            </ModalFooter>
        </Modal>
    );
}

export default Chats;
