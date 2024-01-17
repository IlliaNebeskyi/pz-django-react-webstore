import React, { Component } from "react";

export default class AutIsLogged extends Component {
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
              LOGGED
        </div>
    );
  };
}
