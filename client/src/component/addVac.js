import React, { Component } from "react";
import { connect } from "react-redux";

class AddVacBtnComp extends Component {
  addNewVacBtn = () => (!this.props.newVac ? this.props.updateAddNewVac(true) : this.props.updateAddNewVac(false));

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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("AdminPage : ", state);
  return {
    user: state.user,
    newVac: state.newVac,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVacBtnComp);
