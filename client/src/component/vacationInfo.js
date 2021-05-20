import React, { Component } from "react";
import * as Api from "../api/apiCalls";
import { connect } from "react-redux";
import VacationCards from "../component/vacationCards";

class VacationsInfo extends Component {
  componentDidMount() {
    console.log(this.props.users);
    this.getData();
  }

  currentVacation = {
    id: 0,
    destination: "",
    description: "",
    img: "http://www.localhost:5292/Rome.jpg",
    initialDate: "",
    finalDate: "",
    price: 0,
  };

  getData = async () => {
    let getAllVacations = await Api.postRequest(`/vacations/getAllVacations`);
    this.props.updateVacations([...getAllVacations.data]);
  };

  backToSignUp = () => {
    this.props.isLoggedIn ? this.props.updateIsLoggedIn(false) : this.props.updateIsRegistered(false);
  };

  onChangeFn = (e, defaultValue) => {
    this.currentVacation[e.target.id] = e.target.value;

    console.log(this.currentVacation);

    // this.currentVacation.destination == ""  ? this.currentVacation.destination = default
  };

  onClickFn = (vacationId) => {
    // let favoriteVac =
    console.log(vacationId);
  };

  removeVac = async (id) => {
    let updateDeleteVacation = await Api.postRequest(`/vacations/updateDeleteVacation`, { id: id });
    this.getData();
  };

  updateVac = async (id, vacationOb) => {
    this.currentVacation.id = id;
    console.log(vacationOb);

    console.log(this.currentVacation.values());
    // let updateVacation = await Api.postRequest(`/vacations/updateVacation`, this.currentVacation);
    // console.log(updateVacation, this.currentVacation);
    // this.getData();
  };

  render() {
    let isLoggedIn = this.props.isLoggedIn ? "Log In" : "Sign Up";
    return (
      <div>
        <div className="row ">
          <div className="col-4  p-5">
            <h3>Hello {this.props.users[0].name}😊</h3>
          </div>
          <div className="col-4 p-5">
            <button className="btn btn-success" onClick={() => this.backToSignUp()}>
              go back to {isLoggedIn}
            </button>
          </div>
          <div className="col-4"></div>
        </div>

        <div className="row p-3">
          {this.props.vacations.map((vacation) => (
            <div className="p-3 col-xl-3 col-md-6 col-sm-6">
              <VacationCards isAdmin={this.props.users[0].isAdmin} onClickFn={this.onClickFn} vacation={vacation} removeVac={this.removeVac} onChangeFn={this.onChangeFn} updateVac={this.updateVac}></VacationCards>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("AdminPage : ", state);
  return {
    vacations: state.vacations,
    users: state.users,
    isLoggedIn: state.isLoggedIn,
    isRegistered: state.isRegistered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
    updateVacations(value) {
      dispatch({
        type: "updateVacations",
        payload: value,
      });
    },
    updateUsers(value) {
      dispatch({
        type: "updateUsers",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationsInfo);
