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

  componentDidMount = () => {
    if (this.props.isLoggedIn === true) {
      this.props.updateIsLoggedIn(false);
      this.props.updateUser([]);
    }
  };

  onChangeFN = (event) => (this.currentUser[event.target.id] = event.target.value);

  afterInsertFn = async () => {
    let getUserByMail = await Api.postRequest(`/users/getUserByMail`, { mail: this.currentUser.mail, password: this.currentUser.password });
    this.props.updateUser([...getUserByMail.data]);
    this.props.updateIsLoggedIn(true);
  };

  insertNewUser = async () => {
    let insertNewUser = await Api.postRequest(`/users/addNewUser`, this.currentUser);
    console.log(insertNewUser);
    if (insertNewUser.data.id === 0) {
      return alert("Mail is already in use");
    } else if (insertNewUser.data.id > 0) {
      return this.afterInsertFn();
    }
  };

  onSubmit = () => {
    if (this.currentUser.name === "" || this.currentUser.password === "" || this.currentUser.mail === "") {
      return alert("please please fill all the fields below");
    } else this.insertNewUser();
  };

  render() {
    let isLoggedIn = !this.props.isLoggedIn ? (
      <div className="container mt-0">
        <img className="bgImg" src="http://www.localhost:5292/pexels-valdemaras-d-3824620.jpg"></img>
        <div className="row p-5">
          <div className="col-3"></div>
          <div className="col-6 pt-5">
            <div className="row pt-5">
              <h1 className="relativePos colorWhite">Sign Up</h1>
            </div>
            <div className=" relativePos p-5 ">
              <div className="row w-75 mx-auto">
                <div className="form-group inputTXT">
                  <input type="text" className="form-control mt-2 hoverBorder" id="name" onChange={(e) => this.onChangeFN(e)} placeholder="Please Enter Full Name" />
                </div>
              </div>

              <div className="row w-75 mx-auto">
                <div className="form-group ">
                  <input type="text" className="form-control mt-2 hoverBorder" id="password" onChange={(e) => this.onChangeFN(e)} placeholder="Please Enter Password" />
                </div>
              </div>
              <div className="row w-75 mx-auto">
                <div className="form-group inputTXT">
                  <input type="text" className="form-control mt-2 hoverBorder" id="mail" onChange={(e) => this.onChangeFN(e)} placeholder="Please Enter Mail" />
                </div>

                <button className="btn btn-light mt-3 hoverBorder w-25 mx-auto" onClick={() => this.onSubmit()}>
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    ) : (
      <VacationsInfo></VacationsInfo>
    );

    return (
      <div className="container">
        <div className="row mx-auto">{isLoggedIn}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
