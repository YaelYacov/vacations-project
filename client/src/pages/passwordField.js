import React, { Component } from "react";
import * as Api from "../api/apiCalls";
import { connect } from "react-redux";
import LogIn from "../component/logIn";
import VacationInfo from "../component/vacationInfo";
import UploadImg from "../component/uploadImg";

// orderBy

class PasswordField extends Component {
  componentDidMount = () => {};

  currentUser = {
    mail: "",
    password: "",
  };

  currentUserId = {
    id: 0,
  };

  onChangeFn = (e) => {
    this.currentUser[e.target.id] = e.target.value;
    console.log(e.target.value, e.target.id, this.currentUser);
  };

  loggedInSuccess = (getUserByMail) => {
    this.props.updateUsers([...getUserByMail.data]);
    this.props.updateIsLoggedIn(true);

    this.currentUserId.id = getUserByMail.data[0].id;
  };

  isLoggedIn = async () => {
    let getUserByMail = await Api.postRequest(`/users/getUserByMail`, this.currentUser);

    getUserByMail.data.length == 0 ? alert("Mail Or Password Invalid") : this.loggedInSuccess(getUserByMail);
  };

  onSubmitFn = () => {
    if (this.currentUser.password == "" || this.currentUser.mail == "") {
      return alert("please please fill all the fields below");
    } else this.isLoggedIn();
  };

  render() {
    let isLoggedIn = !this.props.isLoggedIn ? (
      <LogIn onSubmitFn={this.onSubmitFn} onChangeFn={this.onChangeFn}></LogIn>
    ) : (
      <div>
        <div className="row">
          <VacationInfo></VacationInfo>
        </div>
      </div>
    );
    return <div className="container">{isLoggedIn}</div>;
  }
}
const mapStateToProps = (state) => {
  // console.log("AdminPage : ", state);
  return {
    users: state.users,
    isLoggedIn: state.isLoggedIn,
    staff: state.staff,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsers(value) {
      dispatch({
        type: "updateUsers",
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
