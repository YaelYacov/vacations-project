import React, { Component } from "react";
import { connect } from "react-redux";

import { Route, Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          <div class="container-fluid">
            <div className="row">
              <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="col-6">
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link active" aria-current="page">
                          <Link to="/">Home</Link>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link">
                          <Link to="/signsForms/signUp">Sign Up</Link>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link">
                          <Link to="/signsForms/logIn">log in</Link>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6">
                  <div className="container-fluid">
                    <div className="container-fluid">
                      <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => this.onChangeFN(e)} />
                        <button className="btn btn-outline-success" type="submit">
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </nav>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("State : ", state);
  return {
    user: state.user,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
