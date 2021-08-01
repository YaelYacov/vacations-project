import React, { Component } from "react";
import { connect } from "react-redux";
import VacationFrom from "../component/vacationForm";
import * as Api from "../api/apiCalls";

import * as GetAllVacations from "../getAllVacations/getAllVacation";

class AddVacBtnComp extends Component {
  addNewVacBtn = () => (!this.props.newVac ? this.props.updateAddNewVac(true) : this.props.updateAddNewVac(false));
  currentVacation = {
    id: 0,
    destination: "",
    description: "",
    img: "",
    initialDate: "",
    finalDate: "",
    price: 0,
  };

  onChangeFn = (e) => (this.currentVacation[e.target.id] = e.target.value);

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
    await GetAllVacations.getData();
    console.log(addNewVacation);
    this.currentVacation = {};
  };

  render() {
    return (
      <div>
        {this.props.user[0].isAdmin == 0 ? (
          ""
        ) : (
          <div lassName="col-4">
            <button className="btn btn-primary m-3" onClick={() => this.addNewVacBtn()}>
              {!this.props.newVac ? "Add New Vacation" : "Close New Vacation Form"}
            </button>
          </div>
        )}
        {this.props.user[0].isAdmin === 0 ? "" : !this.props.newVac ? "" : <VacationFrom type={0} addNewVac={this.addNewVac} vacation={this.currentVacation} onChangeFn={this.onChangeFn}></VacationFrom>}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    newVac: state.newVac,
    currentVacId: state.currentVacId,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddVacBtnComp);
