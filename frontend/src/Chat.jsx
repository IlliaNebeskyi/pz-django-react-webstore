import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input
} from "reactstrap";
import './chat.css';
import moment from 'moment';

function Chat({ auction, username, toggle, clientId }) {
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({
        message: "",
        client_id: clientId
    });
    const ws = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    useEffect(() => {
        const wsUrl = `ws://${window.location.hostname}:80/ws/chat/${auction.id}/`;

        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.error) {
                console.error(data.error);
            } else {
                setMessages(prevMessages => [...prevMessages, data]);
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.current.onclose = () => {
            console.error('Chat socket closed unexpectedly');
        };

        return () => {
            ws.current.close();
        };
    }, [auction.id]);

    useEffect(() => {
        refreshMessages();
    }, []);

    const refreshMessages = () => {
        axios
            .get('api/chats/auctions/' + auction.id + "/?client_id=" + clientId)
            .then(res => {
                const data = res.data.map(message => ({
                    ...message,
                    sender: message.sender_name || message.sender
                }));
                setMessages(data);
            });
    };

    const sendMessage = () => {
        if (form.message.trim() === "") return;

        ws.current.send(JSON.stringify({
            message: form.message,
            client_id: clientId
        }));
        setForm(prevForm => ({
            ...prevForm,
            message: ""
        }));
    };

    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Chat with {auction.seller_name}</ModalHeader>
            <ModalBody>
                <div className="chat">
                    <div className="chat-history">
                        <ul className="m-b-0">
                            {messages.map((message, key) =>
                                <li className="clearfix" key={key}>
                                    {message.sender === username ? (
                                        <div className="float-right">
                                            <div className="message-data text-right">
                                                <span className="message-data-time">
                                                    {moment(message.created).format("dddd, MMM DD HH:mm A")}
                                                </span>
                                            </div>
                                            <div className="message my-message float-right">{message.message}</div>
                                        </div>
                                    ) : (
                                        <div className="float-left">
                                            <div className="message-data">
                                                <span className="message-data-time">
                                                    {moment(message.created).format("dddd, MMM DD HH:mm A")}
                                                </span>
                                            </div>
                                            <div className="message other-message">{message.message}</div>
                                        </div>
                                    )}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="row w-100">
                    <div className="col-8">
                        <Form>
                            <FormGroup>
                                <Input
                                    type="text"
                                    id="message-message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Enter your message"
                                />
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="col-2">
                        <Button color="success" onClick={sendMessage}>Send</Button>
                    </div>
                    <div className="col-2">
                        <Button onClick={toggle}>Exit</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default Chat;
