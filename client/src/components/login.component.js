import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const uri = process.env.REACT_APP_API_ENDPOINT;


export default class Login extends Component {
  constructor(props) {
    super(props);
    Axios.defaults.withCredentials = true;
    this.state = {
      emailLogin: "",
      passwordLogin: "",
      loginStatus: "",
      data: null,
      loggedIn: false,
      errorMsg: null,
    };
  }

  login(pState) {
    Axios.post(uri+"/login", {
      email: pState.emailLogin,
      password: pState.passwordLogin,
    }, {withCredentials:true}).then((response) => {
      console.log(response);
      if (response.data.message !== "No User Exists") {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ errorMsg: "Invalid email or password" });
      }
    });
  }

  getUser = () => {
    //console.log("GetUser");
    Axios.get(uri+"/user", {withCredentials:true}).then((response) => {
      if (response.data.message !== "No authenticated User") {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <h3>Sign In</h3>
        {this.state.errorMsg ? <div>{this.state.errorMsg}</div> : <div></div>}
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => {
              this.setState({ emailLogin: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {
              this.setState({ passwordLogin: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          className="btn btn-primary btn-block"
          onClick={() => this.login(this.state)}
        >
          Submit
        </button>

        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </div>
    );
  }
}
