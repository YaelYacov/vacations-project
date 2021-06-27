import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { Bar } from "react-chartjs-2";

class GraphComp extends Component {
  componentDidMount = () => {
    console.log(this.props.user.length == 0);
    // && this.props.user[0].isAdmin == 1

    console.log(this.props.vacations.filter((vacation) => vacation.usersVacations.length > 0).map((vac) => vac.destination));
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
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  render() {
    return (
      <div>
        <div className="header">
          <h1 className="title">Horizontal Bar Chart</h1>
          {this.props.user.length == 0 ? (
            <Route path="/followersGraph">
              <Redirect to="/signsForms/logIn" />;
            </Route>
          ) : (
            ""
          )}
        </div>
        <div className="row  m-lg-2 p-5">
          <div className="col-lg-12 w-75 m-lg-12">
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
