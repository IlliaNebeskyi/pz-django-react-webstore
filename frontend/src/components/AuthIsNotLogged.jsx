import React, { Component } from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

import axios from "axios";

export default class AuthIsNotLogged extends Component {
  constructor(props) {
    super(props);
    const { login } = props;
    this.state = {
      errorMessage: "",
      message: "",
      activeItem: false
    };
    this.login = login
  }

  toggle = (item) => {
    this.setState({ activeItem: item ? false : item });
  };

  handleRegister = (item) => {
    this.toggle(item);

    axios
      .post("/api/register", item)
      .catch(error => {
        this.setState({ errorMessage: error });
      })
      .then(() => this.setState({ message: "ok" }));
  };

  handleLogin = (item) => {
    this.toggle(item);

    axios
      .post("/api/login", item)
      .catch(error => {
        this.setState({ errorMessage: error });
      })
      .then(() => this.login());
  };

  createItem = (item) => {
    this.setState({ activeItem: item });
  };

  render() {
    return (
        <div>
              <button className="btn btn-primary" onClick={() => this.createItem(SignUpModal)}>Sign up</button>
              <button className="btn btn-primary" onClick={() => this.createItem(SignInModal)}>Sign in</button>
              {this.state.message ? (<div className="message"> {this.state.message} </div>) : null}
              {this.state.activeItem === SignUpModal ? (
                <SignUpModal
                    activeItem={this.state.activeItem}
                    toggle={() => this.toggle(SignUpModal)}
                    onSave={this.handleRegister}
                />
                ) : null}
            {this.state.activeItem === SignInModal ? (
                <SignInModal
                    activeItem={this.state.activeItem}
                    toggle={() => this.toggle(SignInModal)}
                    onSave={this.handleLogin}
                />
                ) : null}
        </div>
    );
  };
}
