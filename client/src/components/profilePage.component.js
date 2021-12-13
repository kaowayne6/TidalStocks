import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
const uri = process.env.REACT_APP_API_ENDPOINT;

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    Axios.defaults.withCredentials = true;
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      loggedIn: true,
      data: "",
      errorMsg: null,
      errorMsgPassword: null,
      newFName: "",
      newLName: "",
      newEmail: "",
      newPassword: "",
      changePassword: false,
    };
  }

  checkPasswordStrength = (pwd) => {
    if (!pwd.includes("!")) {
      this.setState({ errorMsgPassword: "Password needs an !" });
      console.log("! error");
      return false;
    }
    if (pwd.length < 6) {
      console.log("Length error");
      this.setState({ errorMsgPassword: "Password too short." });
      return false;
    }
    return true;
  };

  updateInfo = (state) => {
    //Check for password stength
    if (state.newPassword != "") {
      //console.log("Password: " + this.state.newPassword);
      let check = this.checkPasswordStrength(this.state.newPassword);
      if (!check) {
        console.log("Password weak!");
        console.log(this.state.errorMsgPassword);
        return;
      }
      state.changePassword = true;
    }

    //Check to see what fields need to be updated
    if (state.newPassword == "") {
      state.changePassword = false;
      state.newPassword = state.password;
    }
    //Update all other fields
    if (this.state.newFName == "") {
      state.newFName = state.firstName;
    }
    if (this.state.newLName == "") {
      state.newLName = state.lastName;
    }
    if (this.state.newEmail == "") {
      state.newEmail = state.emailAddress;
    }

    Axios.post(uri+"/updateInfo", {
      id: state.id,
      fName: state.newFName,
      lName: state.newLName,
      email: state.newEmail,
      password: state.newPassword,
      changePwd: state.changePassword,
    }, {withCredentials:true}).then((response) => {
      this.setState({ data: response.data });
      if (response.data.message == "Update Succesful") {
        /* Play some notification */
        console.log("Account Updated");
      } else {
        console.log("Something went wrong");
        /* Do some kind of warning */
      }
    });
  };

  getUser = () => {
    //console.log("GetUser");
    Axios.get(uri+"/user", {withCredentials:true}).then((response) => {
      if (response.data.message !== "No authenticated User") {
        //console.log(response)
        this.setState({
          loggedIn: true,
          firstName: response.data.fName,
          id: response.data.id,
          lastName: response.data.lName,
          emailAddress: response.data.email,
          password: response.data.password,
        });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  };

  deleteAccount = (state) => {
    Axios.post(uri+"/deleteAccount", {
      id: state.id,
      password: state.password,
      email: state.emailAddress,
    }, {withCredentials:true}).then((response) => {
      this.setState({ data: response.data });
      console.log(response);
      if (response.data.message == "Logged Out") {
        /* go back to homepage */
        this.setState({ loggedIn: false });
        console.log("Account Deleted");
        window.location.reload(false);
      } else {
        alert("Didn't Delete");
        /* Do some kind of warning */
      }
    });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    if (this.state.loggedIn == false) {
      return <Redirect to="/sign-up" />;
    }
    return (
      <div>
        <h3>Profile Page</h3>

        <div className="form-group">
          <div>Add to the fields that you want to change</div>
          <label>First name - (Currently: {this.state.firstName})</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter First Name"
            onChange={(e) => {
              this.setState({ newFName: e.target.value });
              //console.log(this.state.newFName);
            }}
          />
        </div>

        <div className="form-group">
          <label>Last name - (Currently: {this.state.lastName})</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
            onChange={(e) => {
              this.setState({ newLName: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label>Email address - (Currently: {this.state.emailAddress})</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => {
              this.setState({ newEmail: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>
            Password - Need to contain a ! and have more than 6 characters
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {
              this.setState({ newPassword: e.target.value });
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={() => {
            this.updateInfo(this.state);
            this.setState({ errorMsg: null });
            window.location.reload(false);
          }}
        >
          Update Info
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-block btn-warning"
          onClick={() => this.deleteAccount(this.state)}
        >
          Delete Account
        </button>
      </div>
    );
  }
}
