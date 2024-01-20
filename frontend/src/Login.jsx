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

export default function Login({
    onSave,
    toggle,
}) {
  const [form, setForm] = useState({
      username: "",
      password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prevForm => ({
        ...prevForm,
        [name]: value
    }));

  };

  return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form>
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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(form)}
          >
            Login
          </Button>
        </ModalFooter>
      </Modal>
    );
}
