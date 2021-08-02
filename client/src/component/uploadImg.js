import React, { Component } from "react";
import { connect } from "react-redux";

import * as Api from "../api/apiCalls";

class UploadImg extends Component {
  filesToUpload = {};
  componentDidMount = () => {
    console.log(this.props.currentVacId);
  };

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
        // console.log(formData);
      }
    }

    let res = await Api.postRequest("/upload", formData);
    let endOfImageName = res.data ? res.data.map((result) => `${result.filename.substr(-4)}`)[0] : alert("some went wrong!, Please reload the page");

    if (!res.data) alert("error load image, please reload");
    else if (endOfImageName == ".png" || endOfImageName == ".jpg" || endOfImageName == "jpeg" || endOfImageName == ".gif") {
      if (this.props.currentVacId > 0) {
        await Api.postRequest(`/vacations/updateImg`, { img: `http://www.localhost:5292/${res.data[0].filename}`, id: this.props.currentVacId });
        let getAllVacations = await Api.postRequest(`/vacations/getAllVacations`);
        this.props.updateVacations([...getAllVacations.data]);
      } else {
        this.props.updateNewImgName(`http://www.localhost:5292/${res.data[0].filename}`);
      }
    }
  };

  render() {
    return (
      <div className="mt-3 card ">
        <input className="p-3" id="img" name="img" type="file" onChange={($event) => this.fileChangeEvent($event)} multiple></input>
        <button type="button" className="btn btn-secondary btn-s m-2 " onClick={() => this.uploadFile()}>
          Upload img
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("AdminPage : ", state);
  return {
    currentVacId: state.currentVacId,
    newImgName: state.newImgName,
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
    updateNewImgName(value) {
      dispatch({
        type: "updateNewImgName",
        payload: value,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadImg);
