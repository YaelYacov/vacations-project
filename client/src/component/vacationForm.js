import React from "react";
import UploadImg from "./uploadImg";

const VacationForm = ({ vacation, onChangeFn, updateVac, removeVac }) => {
  return (
    <div className="col-12">
      <i className="fas fa-edit float-start m-3"></i> <i className="fas fa-trash-alt float-end  m-3" onClick={() => removeVac(vacation.id)}></i>
      <div className="mb-3">
        <img src={vacation.img} className="card-img-top cardImg"></img>
      </div>
      <UploadImg></UploadImg>
      <div className="mb-3">
        <input type="text" className="form-control mt-2 " id="destination" onChange={(e) => onChangeFn(e, vacation)} placeholder="Change Destination" defaultValue={vacation.destination} />
        <div id="emailHelp" className="form-text"></div>
      </div>
      <div className="mb-3">
        <input type="text" className="form-control mt-2 " id="description" onChange={(e) => onChangeFn(e, vacation)} placeholder="description" defaultValue={vacation.description} />{" "}
      </div>
      <div className="mb-3">
        <input type="number" className="form-control mt-2 " id="price" onChange={(e) => onChangeFn(e, vacation)} placeholder="Change Price" defaultValue={vacation.price} />{" "}
      </div>
      <div className="mb-3">
        <input type="datetime-local" className="form-control mt-2 " id="initialDate" onChange={(e) => onChangeFn(e, vacation)} placeholder="Change Initial Date" defaultValue={vacation.initialDate} />{" "}
      </div>
      <div className="mb-3">
        <input type="datetime-local" className="form-control mt-2 " id="finalDate" onChange={(e) => onChangeFn(e, vacation)} placeholder="Change Final Date" defaultValue={vacation.finalDate} />{" "}
      </div>
      <button className="btn btn-primary m-3" onClick={() => updateVac(vacation)}>
        Update Vacation
      </button>
    </div>
  );
};

export default VacationForm;
