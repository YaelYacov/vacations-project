import React, { Component } from "react";
import { connect } from "react-redux";

import * as Api from "../api/apiCalls";

class UploadImg extends Component {
  filesToUpload;
  componentDidMount = () => {};

  fileChangeEvent = (fileInput) => (this.filesToUpload = fileInput.target.files);

  uploadFile = async () => {
    const formData = new FormData();
    const files = this.filesToUpload;

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]["name"]);
    }
    console.log(formData);

    let res = await Api.postRequest("/upload", formData);
    console.log(res);
    console.log(res.data[0].filename, `http://www.localhost:5292/${res.data[0].filename}`);
    let updateImg = await Api.postRequest(`/vacations/updateImg`, { img: `http://www.localhost:5292/${res.data[0].filename}`, id: this.props.currentVacId });
    let getAllVacations = await Api.postRequest(`/vacations/getAllVacations`);
    this.props.updateVacations([...getAllVacations.data]);

    // const formData = new FormData();
    // const files = this.filesToUpload;
    // console.log(files);

    // for (let i = 0; i < files.length; i++) {
    //   formData.append("uploads[]", files[i], files[i]["name"]);
    // }
    // console.log(formData);
    // let res = await Api.postRequest("/upload", formData);
    // console.log(res);

    // files.map;
  };

  render() {
    return (
      <div className="mt-3 card ">
        <input className="p-3" id="img" name="img" type="file" onChange={($event) => this.fileChangeEvent($event)} multiple></input>
        <button type="button" className="btn btn-success btn-s m-2 " onClick={() => this.uploadFile()}>
          Upload img
        </button>

        {/* <img src={}></img> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("AdminPage : ", state);
  return {
    currentVacId: state.currentVacId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentVacId(value) {
      dispatch({
        type: "updateCurrentVacId",
        payload: value,
      });
    },
    updateVacations(value) {
      dispatch({
        type: "updateVacations",
        payload: value,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadImg);
