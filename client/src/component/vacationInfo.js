import React, { Component } from "react";
import * as Api from "../api/apiCalls";
import { connect } from "react-redux";
import VacationCards from "../component/vacationCards";
import VacationFrom from "../component/vacationForm";

class VacationsInfo extends Component {
  componentDidMount() {
    this.getData();
  }

  currentVacation = {
    id: 0,
    destination: "",
    description: "",
    img: "",
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

  onChangeFn = (e, currentVac) => {
    let currentVacation = this.currentVacation;
    let thisCurrentVac = this.props.vacations.find((vacation) => vacation.id == currentVac.id);
    currentVacation.id = thisCurrentVac.id;
    currentVacation[e.target.id] = e.target.value;

    if (!currentVacation.destination) {
      currentVacation.destination = thisCurrentVac.destination;
    }
    if (!currentVacation.description) {
      currentVacation.description = thisCurrentVac.description;
    }
    if (!currentVacation.initialDate) {
      currentVacation.initialDate = thisCurrentVac.initialDate;
    }
    if (!currentVacation.finalDate) {
      currentVacation.finalDate = thisCurrentVac.finalDate;
    }
    if (!currentVacation.price) {
      currentVacation.price = thisCurrentVac.price;
    }
    if (!currentVacation.img) {
      currentVacation.img = thisCurrentVac.img;
    }
  };

  updateVac = async (vacationOb) => {
    // console.log("vacationOb: ", vacationOb, " currentVacation:", this.currentVacation);
    let updateVacation = await Api.postRequest(`/vacations/updateVacation`, this.currentVacation);
    if (updateVacation.data[0] == 1) {
      this.getData();
      alert(`Updating Vacation id : ${this.currentVacation.id} success`);
      this.currentVacation.id = 0;
      this.currentVacation.destination = "";
      this.currentVacation.description = "";
      this.currentVacation.initialDate = "";
      this.currentVacation.finalDate = "";
      this.currentVacation.price = 0;
      this.currentVacation.img = "";
    } else {
      alert(`Something Went Wrong`);
    }
  };

  onClickFn = (vacationId) => {
    console.log(vacationId);
  };

  removeVac = async (id) => {
    let updateDeleteVacation = await Api.postRequest(`/vacations/updateDeleteVacation`, { id: id });
    this.getData();
  };

  addNewVac = async () => {
    console.log("add new");
    // let addNewVacation = await Api.postRequest(`/vacations/addNewVacation`, {
    //   destination: this.currentVacation.destination,
    //   description: this.currentVacation.description,
    //   initialDate: this.currentVacation.initialDate,
    //   finalDate: this.currentVacation.finalDate,
    //   price: this.currentVacation.price,
    //   img: this.currentVacation.img,
    // });
    // this.getData();
  };

  render() {
    let isLoggedIn = this.props.isLoggedIn ? "Log In" : "Sign Up";
    let isAdmin =
      this.props.users[0].isAdmin == 0 ? (
        ""
      ) : (
        <div>
          <button className="btn btn-primary m-3" onClick={() => this.addNewVac()}>
            Add New Vacation
          </button>
        </div>
      );
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
          {this.props.vacations.map((vacation) => {
            return (
              <div className="p-3 col-xl-3 col-md-6 col-sm-6">
                {this.props.users[0].isAdmin == 0 ? (
                  <VacationCards onClickFn={this.onClickFn} vacation={vacation}></VacationCards>
                ) : (
                  <div>
                    <VacationFrom vacation={vacation} onChangeFn={this.onChangeFn} updateVac={this.updateVac} removeVac={this.removeVac}></VacationFrom>
                  </div>
                )}
              </div>
            );
          })}
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
