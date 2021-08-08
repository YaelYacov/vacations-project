import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Nav extends Component {
  componentDidMount = () => {};
  changeIsLoggedIn = () => {
    if (this.props.isLoggedIn === true) {
      this.props.updateIsLoggedIn(false);
      this.props.updateUser([]);
    }
  };

  state = {
    isAdminAndVacPath: false,
  };

  pathName = () => {
    if (this.props.isLoggedIn && this.props.user[0].isAdmin === 1 && !this.state.isAdminAndVacPath) this.setState({ isAdminAndVacPath: true });
    else if (this.props.isLoggedIn && this.props.user[0].isAdmin === 1 && this.state.isAdminAndVacPath) this.setState({ isAdminAndVacPath: false });
  };

  addNewVacBtn = () => (!this.props.newVac ? this.props.updateAddNewVac(true) : this.props.updateAddNewVac(false));

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6  w-100">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item mx-2">
                    <a className="nav-link navLink" aria-current="page">
                      <Link className="navLink" to="/signsForms/signUp" onClick={() => this.pathName()}>
                        Sign Up
                      </Link>
                    </a>
                  </li>
                  <li className="nav-item  mx-2">
                    <a className="nav-link active navLink " onClick={() => this.changeIsLoggedIn()}>
                      <Link className="navLink active" to="/signsForms/logIn" onClick={() => this.pathName()}>
                        {!this.props.isLoggedIn ? "log In" : "log out"}
                      </Link>
                    </a>
                  </li>
                  {this.props.isLoggedIn && this.props.user[0].isAdmin === 1 && !this.state.isAdminAndVacPath ? (
                    <li className="nav-item mx-2">
                      <Link className="nav-link navLink" to="/followersGraph" onClick={() => this.pathName()}>
                        Followers Graph
                      </Link>
                    </li>
                  ) : this.props.isLoggedIn ? (
                    <Link className="navLink nav-link" to="/vacations" onClick={() => this.pathName()}>
                      Vacations
                    </Link>
                  ) : null}

                  {this.props.isLoggedIn && !this.state.isAdminAndVacPath ? (
                    <li className="nav-item mt-2 mx-2">
                      <a className="aStyle navLink " aria-current="page" onClick={() => this.addNewVacBtn()}>
                        {!this.props.newVac ? "Add New Vacation" : "Close New Vacation Form"}
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("State : ", state);
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
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
    updateIsLoggedIn(value) {
      dispatch({
        type: "updateIsLoggedIn",
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
