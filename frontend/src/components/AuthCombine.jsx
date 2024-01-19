import React, { Component } from "react";
import AuthIsNotLogged from "./AuthIsNotLogged";
import AuthIsLogged from "./AuthIsLogged";

export default class AuthCombine extends Component {
  constructor(props) {
      super(props);

      this.state = {
          isLogged: false
      }
  }

  render() {
    return (
        <div>
          {this.state.isLogged === true ? (
              <AuthIsLogged logout={() => this.state.isLogged = false}/>
          ) : (
              <AuthIsNotLogged login={() => this.state.isLogged = true}/>
          )}
        </div>
    );
  };
}
