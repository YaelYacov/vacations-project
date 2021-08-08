import React, { Component } from "react";
import * as GetAllVacations from "../getAllVacations/getAllVacation";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { Bar } from "react-chartjs-2";

class GraphComp extends Component {
  componentDidMount = () => {};

  getData = async () => {
    let getAllVacations = await GetAllVacations.getData();
    this.props.updateVacations([...getAllVacations.data]);
  };

  data = {
    labels: [...this.props.vacations.filter((vacation) => vacation.usersVacations.length > 0).map((vac) => vac.destination)],
    datasets: [
      {
        label: "# of Red Votes",
        data: [...this.props.vacations.filter((vacation) => vacation.usersVacations.length > 0).map((vac) => vac.usersVacations.length)],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
      },
    ],
  };

  options = {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    // responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Vacations Stars",
      },
    },
  };

  render() {
    return (
      <div className="vacInfoCon pb-5">
        <div className="header pb-3">
          <h1 className="title RalewayFont fontSize pt-4">Vacation Followers</h1>
          {this.props.user.length === 0 ? (
            <Route path="/followersGraph">
              <Redirect to="/signsForms/logIn" />;
            </Route>
          ) : (
            ""
          )}
        </div>
        <div className="row mx-auto ">
          <div className=" mx-auto col-lg-12 w-75 m-lg-12">
            <Bar data={this.data} options={this.options} />
          </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphComp);
