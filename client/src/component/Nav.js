import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";

class Nav extends Component {
  componentDidMount = () => {
    console.log(window.location);
  };
  changeIsLoggedIn = () => {
    if (this.props.isLoggedIn === true) {
      this.props.updateIsLoggedIn(false);
      this.props.updateUser([]);
    }
  };

  addNewVacBtn = () => (!this.props.newVac ? this.props.updateAddNewVac(true) : this.props.updateAddNewVac(false));

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6  w-100">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link">
                      <Link to="/signsForms/signUp">Sign Up</Link>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " onClick={() => this.changeIsLoggedIn()}>
                      <Link to="/signsForms/logIn">log In</Link>
                    </a>
                  </li>
                  {this.props.user.length === 0 ? (
                    ""
                  ) : this.props.user[0].isAdmin === 0 ? (
                    ""
                  ) : (
                    <li className="nav-item">
                      <a className="nav-link">
                        <Link to="/followersGraph">Followers Graph </Link>
                      </a>
                    </li>
                  )}
                  {this.props.user.length === 0 ? (
                    ""
                  ) : this.props.user[0].isAdmin === 1 ? (
                    <li className="nav-item">
                      <a className="nav-link">
                        <Link to="/vacations">Vacations</Link>
                      </a>
                    </li>
                  ) : this.props.user[0].isAdmin && window.location.pathname === "/vacations" ? (
                    <li className="nav-item">
                      <a className="nav-link">
                        <Link to="/followersGraph">Followers Graph </Link>
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {this.props.user.length === 0 ? (
                    ""
                  ) : this.props.user[0].isAdmin === 0 ? (
                    ""
                  ) : (
                    <li className="nav-item">
                      <a className="nav-link" onClick={() => this.addNewVacBtn()}>
                        <Link to="/newVacation"> {!this.props.newVac ? "Add New Vacation" : "Close New Vacation Form"}</Link>
                      </a>
                    </li>
                  )}
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
