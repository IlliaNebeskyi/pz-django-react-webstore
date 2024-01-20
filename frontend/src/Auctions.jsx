import React, { useState } from 'react';
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

function Register({
    onSave,
    toggle,
}) {const [form, setForm] = useState({
      email: "",
      username: "",
      password: "",
      password2: "",
      city: "",
      street: "",
      street_number: "",
      bank_number: ""
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    setForm(prevForm => ({
        ...prevForm,
        [name]: value
    }));
  };

  return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="user-email">Email</Label>
              <Input
                type="text"
                id="user-email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-username">Username</Label>
              <Input
                type="text"
                id="user-username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-password">Password</Label>
              <Input
                type="text"
                id="user-password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-password2">Password2</Label>
              <Input
                type="text"
                id="user-password2"
                name="password2"
                value={form.password2}
                onChange={handleChange}
                placeholder="Enter password again"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-city">City</Label>
              <Input
                type="text"
                id="user-city"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-street">Street</Label>
              <Input
                type="text"
                id="user-street"
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Enter Street"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-street_number">Street number</Label>
              <Input
                type="text"
                id="user-street_number"
                name="street_number"
                value={form.street_number}
                onChange={handleChange}
                placeholder="Enter Street number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-password2">Bank number</Label>
              <Input
                type="text"
                id="user-bank_number"
                name="bank_number"
                value={form.bank_number}
                onChange={handleChange}
                placeholder="Enter bank number"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(form)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
}

export default Register;
