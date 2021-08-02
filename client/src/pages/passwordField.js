import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";

import * as Api from "../api/apiCalls";
import { connect } from "react-redux";
import LogIn from "../component/logIn";
import VacationInfo from "../component/vacationInfo";
import UploadImg from "../component/uploadImg";

class PasswordField extends Component {
  componentDidMount = () => {};

  currentUser = {
    mail: "",
    password: "",
  };

  currentUserId = {
    id: 0,
  };

  onChangeFn = (e) => (this.currentUser[e.target.id] = e.target.value);

  loggedInSuccess = (getUserByMail) => {
    this.props.updateUser([...getUserByMail]);
    this.props.updateIsLoggedIn(true);
    this.currentUserId.id = getUserByMail[0].id;
  };

  isLoggedIn = async () => {
    let getUserByMail = await Api.postRequest(`/users/getUserByMail`, this.currentUser);

    getUserByMail.data.length == 0 ? alert("Mail Or Password Invalid") : this.loggedInSuccess(getUserByMail.data);
  };

  onSubmitFn = () => {
    if (this.currentUser.password === "" || this.currentUser.mail === "") {
      return alert("please please fill all the fields below");
    } else this.isLoggedIn();
  };

  render() {
    return (
      <div className="container bgPasPage w-100 ">
        {!this.props.isLoggedIn ? (
          <div className=" pt-5">
            <LogIn onSubmitFn={this.onSubmitFn} onChangeFn={this.onChangeFn}></LogIn>
            <h5>
              Doesn't have an account yet?
              <a className="nav-link">
                <Link to="/signsForms/signUp">Sign Up</Link>
              </a>
            </h5>
          </div>
        ) : (
          <div>
            <div className="row">
              <Route path="/signsForms/logIn">
                <Redirect to="/vacations" />;
              </Route>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("AdminPage : ", state);
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser(value) {
      dispatch({
        type: "updateUser",
        payload: value,
      });
    },
    updateIsLoggedIn(value) {
      dispatch({
        type: "updateIsLoggedIn",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordField);
