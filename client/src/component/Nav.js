import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";

class Nav extends Component {
  changeIsLoggedIn = () => {
    if (this.props.isLoggedIn == true) {
      this.props.updateIsLoggedIn(false);
      this.props.updateUser([]);
    }
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <div className="row">
            <div className={`col-6 ${this.props.user.length == 0 ? "w-100" : "w-50"} `}>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  {/* <li className="nav-item">
                        <a className="nav-link active" aria-current="page">
                          <Link to="/">Home</Link>
                        </a>
                      </li> */}
                  <li className="nav-item">
                    <a className="nav-link">
                      <Link to="/signsForms/signUp">Sign Up</Link>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " onClick={() => this.changeIsLoggedIn()}>
                      <Link to="/signsForms/logIn">log in</Link>
                    </a>
                  </li>
                  {this.props.user.length == 0 ? (
                    ""
                  ) : this.props.user[0].isAdmin == 0 ? (
                    ""
                  ) : (
                    <li className="nav-item">
                      <a className="nav-link">
                        <Link to="/followersGraph">followers Graph</Link>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {this.props.user.length == 0 ? (
              ""
            ) : (
              <div className={`col-6 ${this.props.user.length == 0 ? "w-100" : "w-50"} `}>
                <div className="container-fluid">
                  {/* <form className="d-flex"> */}
                  <div className="row ">
                    <div className="col-6 w-75 ">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => this.onChangeFN(e)} />
                    </div>
                    <div className="col-6 w-25">
                      <button className="btn btn-outline-success" type="submit">
                        Search
                      </button>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
