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

export default class SignInModal extends Component {
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
        <ModalHeader toggle={toggle}>Sign In</ModalHeader>
        <ModalBody>
          <Form>
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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Log In
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}