import React, { Component } from "react";
import { connect } from "react-redux";

import { Bar } from "react-chartjs-2";

class GraphComp extends Component {
  componentDidMount = () => {
    console.log(this.props.vacations.map((vac) => vac.destination));
  };

  data = {
    labels: [...this.props.vacations.map((vac) => vac.destination)],
    //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: `# of Followers`,
        data: [...this.props.vacations.map((vac) => vac.usersVacations.length)],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
      //   {
      //     label: `${this.props.vacations[1].usersVacations.length} of Followers `,
      //     data: [...this.props.vacations.map((vac) => vac.usersVacations.length)],
      //     backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 99, 132, 0.2)"],
      //     borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)", "rgba(255, 99, 132, 1)"],
      //     borderWidth: 1,
      //   },
      //   {
      //     label: `${this.props.vacations[1].usersVacations.length} of Followers `,
      //     data: [...this.props.vacations.map((vac) => vac.usersVacations.length)],
      //     backgroundColor: ["rgba(255, 206, 86, 0.2)"],
      //     borderColor: ["rgba(255, 206, 86, 1)"],
      //     borderWidth: 1,
      //   },
    ],
  };

  options = {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "go f** yourself",
      },
    },
  };

  render() {
    return (
      <div>
        <div className="header">
          <h1 className="title">Horizontal Bar Chart</h1>
        </div>
        <Bar data={this.data} options={this.options} />
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
