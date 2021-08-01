import React, { Component } from "react";
import * as Api from "../api/apiCalls";
import * as GetAllVacations from "../getAllVacations/getAllVacation";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import VacationCards from "../component/vacationCards";
import VacationFrom from "../component/vacationForm";
import AddVacBtnComp from "../component/addVac";

class VacationsInfo extends Component {
  socket;
  state = {
    endpoint: "localhost:3004",
  };

  componentDidMount = () => {
    this.getData();
    this.socket = socketIOClient(this.state.endpoint);

    this.socket.on("deliverVacationForDeletion", (id) => {
      console.log(this.props.vacations);
      this.removeVacation(id);
    });

    this.socket.on("updateVacFn", (id) => {
      let CurrentVac = this.props.vacations.find((vacation) => vacation.id === id);
      let userMatch = CurrentVac.usersVacations.map((userVac) => userVac.userId);
      let findUserMatch = userMatch.includes(this.props.user[0].id);

      if (findUserMatch || this.props.user[0].isAdmin === 1) this.getData();
    });
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
    let getAllVacations = await GetAllVacations.getData();
    this.props.updateVacations([...getAllVacations.data]);
    this.props.vacations.map((vac) => this.allLikedVacs({ ...vac }));
  };

  onChangeFn = (e, currentVac, type) => {
    let currentVacation = this.currentVacation;
    if (type === 1) {
      let CurrentVac = this.props.vacations.find((vacation) => vacation.id === currentVac.id);
      currentVacation.id = CurrentVac.id;
      currentVacation[e.target.id] = e.target.value;

      if (!currentVacation.destination) {
        currentVacation.destination = CurrentVac.destination;
      }
      if (!currentVacation.description) {
        currentVacation.description = CurrentVac.description;
      }
      if (!currentVacation.initialDate) {
        currentVacation.initialDate = CurrentVac.initialDate;
      }
      if (!currentVacation.finalDate) {
        currentVacation.finalDate = CurrentVac.finalDate;
      }
      if (!currentVacation.price) {
        currentVacation.price = CurrentVac.price;
      }
      if (!currentVacation.img) {
        currentVacation.img = CurrentVac.img;
      }
    } else {
      currentVacation[e.target.id] = e.target.value;
    }
  };

  updateVac = async () => {
    let updateVacation = await Api.postRequest(`/vacations/updateVacation`, this.currentVacation);

    if (updateVacation.data[0] === 1) {
      alert(`Updating Vacation id : ${this.currentVacation.id} success`);
      this.editVac(this.currentVacation.id);
      this.socket.emit("updateVac", this.currentVacation.id);
      this.currentVacation.id = 0;
      this.currentVacation.destination = "";
      this.currentVacation.description = "";
      this.currentVacation.initialDate = "";
      this.currentVacation.finalDate = "";
      this.currentVacation.price = 0;
      this.currentVacation.img = "";
    }
  };

  changeVacLoc = (vacationId) => {
    let findIdxVacInArr = this.props.vacations.findIndex((vac) => vac.id === vacationId);
    let spliceVacFromArr = this.props.vacations.splice(findIdxVacInArr, 1);
    let unshiftVac = this.props.vacations.unshift(spliceVacFromArr[0]);
    this.props.updateVacations([...this.props.vacations]);
  };

  allLikedVacs = (vacation) => {
    let filteredVacs = [];
    if (vacation.usersVacations.length > 0) {
      filteredVacs = vacation.usersVacations.filter((userVac) => userVac.userId === this.props.user[0].id);
      if (filteredVacs.length > 0) this.changeVacLoc(vacation.id);
    }
  };

  addVacToFavoritesFN = async (vacationId) => {
    this.socket.emit("updateFavorites", vacationId);
    let getAllUsersVacations = await Api.postRequest(`/usersVacations/getAllUsersVacations`);
    let ifUserExistsInTable = getAllUsersVacations.data.find((userVac) => userVac.vacationId == vacationId && userVac.userId == this.props.user[0].id); //if not exist = undefined;
    if (ifUserExistsInTable == undefined) {
      let insertNewFollowerToVac = await Api.postRequest(`/usersVacations/insertNewFollowerToVac`, { vacationId: vacationId, userId: this.props.user[0].id });
      console.log(insertNewFollowerToVac);
      this.getData();
    } else if (ifUserExistsInTable.isDeleted === 0) {
      await Api.postRequest(`/usersVacations/updateDeleteFollowerToVac`, { isDeleted: 1, vacationId: vacationId, userId: this.props.user[0].id });
      this.getData();
    }
  };

  removeVac = (id) => {
    this.socket.emit("vacationIdForDeletion", id);
  };

  removeVacation = async (id) => {
    let updateDeleteVacation = await Api.postRequest(`/vacations/updateDeleteVacation`, { id: id });
    console.log(updateDeleteVacation);
    this.getData();
  };

  addNewVac = async () => {
    this.props.updateCurrentVacId(0);
    console.log(this.props.newImgName);

    let addNewVacation = await Api.postRequest(`/vacations/addNewVacation`, {
      destination: this.currentVacation.destination,
      description: this.currentVacation.description,
      initialDate: this.currentVacation.initialDate,
      finalDate: this.currentVacation.finalDate,
      price: this.currentVacation.price,
      img: this.props.newImgName,
    });
    this.getData();
    console.log(addNewVacation);
    this.currentVacation = {};
  };

  editVac = (vacId) => {
    this.props.updateCurrentVacId(vacId);
    let findVac = this.props.vacations.find((vac) => vac.id === vacId);
    let changeIsEdit = !findVac.isEditVac ? (findVac.isEditVac = true) : (findVac.isEditVac = false);
    this.props.updateVacations([...this.props.vacations]);
  };

  render() {
    let openVacForm = this.props.user[0].isAdmin === 0 ? "" : !this.props.newVac ? "" : <VacationFrom type={0} addNewVac={this.addNewVac} vacation={this.currentVacation} onChangeFn={this.onChangeFn}></VacationFrom>;
    return (
      <div>
        <div className="row ">
          <div className="col-4  p-5">
            <h3>Hello {this.props.user[0].name}😊</h3>
          </div>
          <div className="col-4">
            <AddVacBtnComp></AddVacBtnComp>
          </div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">{openVacForm}</div>
          <div className="col-4"></div>
        </div>
        <div className="row p-3">
          {this.props.vacations.map((vacation) => {
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
    newVac: state.newVac,
    currentVacId: state.currentVacId,
    newImgName: state.newImgName,
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
