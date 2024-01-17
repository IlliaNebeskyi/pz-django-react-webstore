import React, { Component } from "react";
import AutIsNotLogged from "./AutIsNotLogged";
import AuthIsLogged from "./AuthIsLogged";

export default class AuthCombine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_logged: false,
      errorMessage: "",
      message: "",
      activeItem: false,
    };
  }

  render() {
    return (
        <div>
          {this.state.is_logged === true ? (
              <AuthIsLogged/>
          ) : (
              <AutIsNotLogged/>
          )}
        </div>
    );
  };
}
