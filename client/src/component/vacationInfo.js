import React, { Component } from "react";
import * as Api from "../api/apiCalls";
import { connect } from "react-redux";
import VacationCards from "../component/vacationCards";
import VacationFrom from "../component/vacationForm";

class VacationsInfo extends Component {
  componentDidMount = () => {
    // console.log(this.props.user);
    this.getData();
  };
  currentVacFavoriteId = -1;

  currentVacation = {
    id: 0,
    destination: "",
    description: "",
    img: "",
    initialDate: "",
    finalDate: "",
    price: 0,
  };

  likedVacArr = [];

  getData = async () => {
    let getAllVacations = await Api.postRequest(`/vacations/getAllVacations`);
    if (getAllVacations.statusText == "OK" && getAllVacations.status == 200) {
      this.props.updateVacations([...getAllVacations.data]);
      this.props.vacations.map((vac) => this.allLikedVacs({ ...vac }));
    }
  };

  backToSignUp = () => (this.props.isLoggedIn ? this.props.updateIsLoggedIn(false) : this.props.updateIsRegistered(false));

  onChangeFn = (e, currentVac, type) => {
    let currentVacation = this.currentVacation;
    if (type == 1) {
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
    } else {
      currentVacation[e.target.id] = e.target.value;
    }
  };

  updateVac = async () => {
    let updateVacation = await Api.postRequest(`/vacations/updateVacation`, this.currentVacation);
    if (updateVacation.data[0] == 1) {
      this.getData();
      alert(`Updating Vacation id : ${this.currentVacation.id} success`);
      this.editVac(this.currentVacation.id);
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

  changeVacLoc = (vacationId) => {
    let findIdxVacInArr = this.props.vacations.findIndex((vac) => vac.id == vacationId);
    let spliceVacFromArr = this.props.vacations.splice(findIdxVacInArr, 1);
    let unshiftVac = this.props.vacations.unshift(spliceVacFromArr[0]);
    this.props.updateVacations([...this.props.vacations]);

    // console.log(this.props.vacations, findIdxVacInArr);
  };

  allLikedVacs = (vacation) => {
    let filteredVacs = [];
    if (vacation.usersVacations.length > 0) {
      filteredVacs = vacation.usersVacations.filter((userVac) => userVac.userId == this.props.user[0].id);
      if (filteredVacs.length > 0) this.changeVacLoc(vacation.id);
    }
  };

  addVacToFavoritesFN = async (vacationId) => {
    let getAllUsersVacations = await Api.postRequest(`/usersVacations/getAllUsersVacations`);
    let ifUserExistsInTable = getAllUsersVacations.data.find((userVac) => userVac.vacationId == vacationId && userVac.userId == this.props.user[0].id); //if not exist = undefined;

    if (ifUserExistsInTable == undefined) {
      await Api.postRequest(`/usersVacations/insertNewFollowerToVac`, { vacationId: vacationId, userId: this.props.user[0].id });
      this.getData();
    } else if (ifUserExistsInTable.isDeleted == 0) {
      await Api.postRequest(`/usersVacations/updateDeleteFollowerToVac`, { isDeleted: 1, vacationId: vacationId, userId: this.props.user[0].id });
      this.getData();
    }
  };

  removeVac = async (id) => {
    let updateDeleteVacation = await Api.postRequest(`/vacations/updateDeleteVacation`, { id: id });
    this.getData();
  };

  addNewVacBtn = () => (!this.props.newVac ? this.props.updateAddNewVac(true) : this.props.updateAddNewVac(false));

  addNewVac = async () => {
    let addNewVacation = await Api.postRequest(`/vacations/addNewVacation`, {
      destination: this.currentVacation.destination,
      description: this.currentVacation.description,
      initialDate: this.currentVacation.initialDate,
      finalDate: this.currentVacation.finalDate,
      price: this.currentVacation.price,
      img: this.currentVacation.img,
    });
    this.getData();
    console.log(addNewVacation);
  };

  editVac = (vacId) => {
    let findVac = this.props.vacations.find((vac) => vac.id == vacId);
    let changeIsEdit = !findVac.isEditVac ? (findVac.isEditVac = true) : (findVac.isEditVac = false);
    this.props.updateVacations([...this.props.vacations]);
    this.props.updateCurrentVacId(vacId);
    console.log(this.props.vacations);
  };

  render() {
    let isAdmin =
      this.props.user[0].isAdmin == 0 ? (
        ""
      ) : (
        <div>
          <button className="btn btn-primary m-3" onClick={() => this.addNewVacBtn()}>
            {!this.props.newVac ? "Add New Vacation" : "Close New Vacation Form"}
          </button>
        </div>
      );

    let openFormVac = this.props.user[0].isAdmin == 0 ? "" : !this.props.newVac ? "" : <VacationFrom type={0} addNewVac={this.addNewVac} vacation={this.currentVacation} onChangeFn={this.onChangeFn}></VacationFrom>;
    return (
      <div>
        <div className="row ">
          <div className="col-4  p-5">
            <h3>Hello {this.props.user[0].name}😊</h3>
          </div>

          <div className="col-4 p-5">
            <button className="btn btn-success" onClick={() => this.backToSignUp()}>
              go back to {this.props.isLoggedIn ? "Log In" : "Sign Up"}
            </button>
          </div>
          <div className="col-4">{isAdmin}</div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">{openFormVac}</div>
          <div className="col-4"></div>
        </div>
        <div className="row p-3">
          {this.props.vacations.map((vacation, index) => {
            // console.log(vacation.usersVacations);
            return (
              <div className="p-3 col-xl-3 col-md-6 col-sm-6">
                <VacationCards user={this.props.user[0]} addVacToFavoritesFN={this.addVacToFavoritesFN} vacation={vacation} removeVac={this.removeVac} onChangeFn={this.onChangeFn} updateVac={this.updateVac} editVac={this.editVac}></VacationCards>
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
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    isRegistered: state.isRegistered,
    newVac: state.newVac,
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
    updateUser(value) {
      dispatch({
        type: "updateUser",
        payload: value,
      });
    },
    updateAddNewVac(value) {
      dispatch({
        type: "updateAddNewVac",
        payload: value,
      });
    },
    updateCurrentVacId(value) {
      dispatch({
        type: "updateCurrentVacId",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationsInfo);
