import React, {useState, useEffect} from 'react';
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
} from "reactstrap";

export default function EditAuction({
                                        auction,
                                        toggle,
                                        onSave
                                    }) {
    const [form, setForm] = useState({
        title: auction.title,
        body: auction.body,
        price: auction.price
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));

    };

    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit your auction</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="auction-title">Title</Label>
                        <Input
                            type="text"
                            id="auction-title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="auction-body">Description</Label>
                        <Input
                            type="text"
                            id="auction-body"
                            name="body"
                            value={form.body}
                            onChange={handleChange}
                            placeholder="Enter description"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="auction-price">Price</Label>
                        <Input
                            type="text"
                            id="auction-price"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => onSave(form)}>Edit</Button>
            </ModalFooter>
        </Modal>
    );
}
