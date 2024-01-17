import React, { Component } from "react";
import AuthCombine from "./components/AuthCombine";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <main className="container">
          <h1 className="text-white text-uppercase text-center my-4">Webstore</h1>
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="mb-4">
                  <AuthCombine/>
                </div>
              </div>
            </div>
          </div>
        </main>
    );
  }
}

export default App;