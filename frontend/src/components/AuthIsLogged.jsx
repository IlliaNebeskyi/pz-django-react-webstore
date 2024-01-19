import React, { Component } from "react";

import axios from "axios";

export default class AuthIsLogged extends Component {
  constructor(props) {
    super(props);
    const { logout } = props
    this.logout = logout
  }

  handleLogout = () => {
    axios
      .post("/api/logout")
      .catch(error => {
        this.setState({ errorMessage: error })
      })
      .then(() => this.logout());

  };

  render() {
    return (
        <div>
              <button className="btn btn-primary" onClick={() => this.handleLogout()}>Sign up</button>
        </div>
    );
  };
}
