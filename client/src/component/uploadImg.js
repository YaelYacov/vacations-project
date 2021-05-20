import React, { Component } from "react";
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

export default UploadImg;
