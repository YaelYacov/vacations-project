import React, { Component } from "react";
import { connect } from "react-redux";
import * as Api from "../api/apiCalls";
import VacationsInfo from "../component/vacationInfo";

class SignUp extends Component {
  currentUser = {
    name: "11",
    password: "",
    mail: "22",
  };

  componentDidMount = () => {};

  onChangeFN = (event) => {
    this.currentUser[event.target.id] = event.target.value;
    console.log(this.currentUser);
  };

  afterInsertFn = async () => {
    let getUserByMail = await Api.postRequest(`/users/getUserByMail`, { mail: this.currentUser.mail, password: this.currentUser.password });
    this.props.updateUsers([...getUserByMail.data]);
    this.props.updateIsRegistered(true);
  };

  insertNewUser = async () => {
    let insertNewUser = await Api.postRequest(`/users/addNewUser`, this.currentUser);
    console.log(insertNewUser);
    if (insertNewUser.data.id == 0) {
      return alert("Mail is already in use");
    } else if (insertNewUser.data.id > 0) {
      return this.afterInsertFn();
    }
  };

  onSubmit = () => {
    if (this.currentUser.name == "" || this.currentUser.password == "" || this.currentUser.mail == "") {
      return alert("please please fill all the fields below go f** yourself");
    } else this.insertNewUser();
  };

  render() {
    let isRegistered = !this.props.isRegistered ? (
      <div className="col-12 p-5">
        <div className="row">
          <h1>Sign Up</h1>
        </div>
        <div className="row">
          <div className="form-group inputTXT">
            <input type="text" className="form-control mt-2 " id="name" onChange={(e) => this.onChangeFN(e)} placeholder="Please Enter Full Name" />
          </div>
        </div>

        <div className="row">
          <div className="form-group ">
            <input type="text" className="form-control mt-2 " id="password" onChange={(e) => this.onChangeFN(e)} placeholder="Please Enter Password" />
          </div>
        </div>
        <div className="row">
          <div className="form-group inputTXT">
            <input type="text" className="form-control mt-2 " id="mail" onChange={(e) => this.onChangeFN(e)} placeholder="Please Enter Mail" />
          </div>

          <button className="btn btn-primary mt-3" onClick={() => this.onSubmit()}>
            Submit
          </button>
        </div>
      </div>
    ) : (
      <VacationsInfo></VacationsInfo>
    );

    return (
      <div className="container">
        <div className="row pt-5 mx-auto">{isRegistered}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("State : ", state);
  return {
    users: state.users,
    isLoggedIn: state.isLoggedIn,
    isRegistered: state.isRegistered,
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
    updateIsLoggedIn(value) {
      dispatch({
        type: "updateIsLoggedIn",
        payload: value,
      });
    },
    updateIsRegistered(value) {
      dispatch({
        type: "updateIsRegistered",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
