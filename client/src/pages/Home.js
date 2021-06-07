import React, { Component } from "react";
import { connect } from "react-redux";
import * as Api from "../api/apiCalls";
// ES6 import or TypeScript
import { io } from "socket.io-client";
// CommonJS
// const io = require("socket.io-client");

class Home extends Component {
  componentDidMount = () => {};

  onChangeFN = (event) => {};

  async onSubmit() {}

  render() {
    return <div className="row p-5">home page</div>;
  }
}

const mapStateToProps = (state) => {
  // console.log("State : ", state);
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUserToArray(value) {
      dispatch({
        type: "addUserToArray",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
