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
    Label,
    Table,
} from "reactstrap";
import './chat.css';
import moment from 'moment';

function Chat({
                  auction,
                  username,
                  toggle,
                  clientId
              }) {
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({
        message: "",
        client_id: clientId
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            refreshMessages();
        };
        fetchData();
    }, []);

    const refreshMessages = () => {
        axios
            .get('api/chats/auctions/' + auction.id + "/?client_id=" + clientId)
            .then(res => {
                const data = res.data;
                setMessages(data)
            });
    }

    const sendMessage = (form) => {
        axios
            .post("/api/chats/auctions/" + auction.id + "/send-message/", form)
            .catch((error) => {
                alert(error);
            })
            .then(() => {
                refreshMessages();
                setForm({'message': ''})
            });
    }


    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Chat with {auction.seller_name}</ModalHeader>
            <ModalBody>
                <div className="chat">
                    <div className="chat-history">
                        <ul className="m-b-0">
                            {
                                messages.map((message, key) =>
                                    <li className="clearfix" key={key}>
                                        {message.sender_name === username ? (
                                            <div className="float-right">
                                                <div className="message-data">
                                                    <span
                                                        className="message-data-time">{moment(message.created).format("dddd, MMM DD HH:mm A")}</span>
                                                </div>
                                                <div className="message my-message float-right">{message.message}</div>
                                            </div>

                                        ) : (
                                            <div>
                                                <div className="message-data">
                                                    <span
                                                        className="message-data-time">{moment(message.created).format("dddd, MMM DD HH:mm A")}</span>
                                                </div>
                                                <div className="message other-message">{message.message}</div>
                                            </div>
                                        )}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="row">
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
                        <Button color="success" onClick={() => sendMessage(form)}>Send</Button>
                    </div>
                    <div className="col-2">
                        <Button onClick={() => toggle()}>Exit</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default Chat;
