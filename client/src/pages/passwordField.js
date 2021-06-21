import React, { Component } from "react";
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
    if (this.currentUser.password == "" || this.currentUser.mail == "") {
      return alert("please please fill all the fields below");
    } else this.isLoggedIn();
  };

  render() {
    return (
      <div className="container">
        {!this.props.isLoggedIn ? (
          <LogIn onSubmitFn={this.onSubmitFn} onChangeFn={this.onChangeFn}></LogIn>
        ) : (
          <div>
            <div className="row">
              <VacationInfo></VacationInfo>
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
    staff: state.staff,
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

    updateStaff(value) {
      dispatch({
        type: "updateStaff",
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
