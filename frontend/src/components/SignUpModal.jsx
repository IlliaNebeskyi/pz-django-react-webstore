import React, { Component } from "react";
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

export default class SignUpModal extends Component {
  constructor(props) {
    super(props);
    const { activeItem, toggle, onSave } = props;
    this.state = {
      activeItem: activeItem,
      toggle: toggle,
      onSave: onSave
    };
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

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
                value={this.state.activeItem.email}
                onChange={this.handleChange}
                placeholder="Enter Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-username">Username</Label>
              <Input
                type="text"
                id="user-username"
                name="username"
                value={this.state.activeItem.username}
                onChange={this.handleChange}
                placeholder="Enter username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-password">Password</Label>
              <Input
                type="text"
                id="user-password"
                name="password"
                value={this.state.activeItem.password}
                onChange={this.handleChange}
                placeholder="Enter password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-password2">Password2</Label>
              <Input
                type="text"
                id="user-password2"
                name="password2"
                value={this.state.activeItem.password2}
                onChange={this.handleChange}
                placeholder="Enter password again"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-city">City</Label>
              <Input
                type="text"
                id="user-city"
                name="city"
                value={this.state.activeItem.city}
                onChange={this.handleChange}
                placeholder="City"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-street">Street</Label>
              <Input
                type="text"
                id="user-street"
                name="street"
                value={this.state.activeItem.street}
                onChange={this.handleChange}
                placeholder="Enter Street"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-street_number">Street number</Label>
              <Input
                type="text"
                id="user-street_number"
                name="street_number"
                value={this.state.activeItem.street_number}
                onChange={this.handleChange}
                placeholder="Enter Street number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-password2">Bank number</Label>
              <Input
                type="text"
                id="user-bank_number"
                name="bank_number"
                value={this.state.activeItem.bank_number}
                onChange={this.handleChange}
                placeholder="Enter bank number"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}