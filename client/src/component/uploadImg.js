import React, { Component } from "react";
import { connect } from "react-redux";

import * as Api from "../api/apiCalls";

class UploadImg extends Component {
  filesToUpload;
  componentDidMount = () => {};

  fileChangeEvent = (fileInput) => {
    this.filesToUpload = fileInput.target.files;
    console.log(this.filesToUpload);
  };

  uploadFile = async () => {
    const formData = new FormData();
    const files = this.filesToUpload;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }
      console.log(formData);
    }

    let res = await Api.postRequest("/upload", formData);
    console.log(res);
    let endOfImageName = res.data ? res.data.map((result) => `${result.filename.substr(-4)}`)[0] : console.log("some went wrong!, reload page");

    console.log(endOfImageName);

    let updateImg = !res.data ? alert("error load image, please reload") : endOfImageName == ".png" || endOfImageName == ".jpg" || endOfImageName == "jpeg" || endOfImageName == ".gif" ? await Api.postRequest(`/vacations/updateImg`, { img: `http://www.localhost:5292/${res.data[0].filename}`, id: this.props.currentVacId }) : alert("file is not an image");
    console.log(res.data[0].filename, `http://www.localhost:5292/${res.data[0].filename}`, res.data[0].size);
    let getAllVacations = await Api.postRequest(`/vacations/getAllVacations`);
    this.props.updateVacations([...getAllVacations.data]);
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
    updateVacations(value) {
      dispatch({
        type: "updateVacations",
        payload: value,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadImg);
