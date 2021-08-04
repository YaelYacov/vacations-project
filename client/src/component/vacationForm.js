import React from "react";
import UploadImg from "./uploadImg";
const VacationForm = ({ type, vacation, onChangeFn, updateVac, removeVac, addNewVac, editVac }) => {
  let trashIcon =
    type == 1 ? (
      <div>
        <i className="fas fa-edit float-start m-3" onClick={() => editVac(vacation.id)}></i> <i className="fas fa-trash-alt float-end  m-3 " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => removeVac(vacation.id)}></i>
      </div>
    ) : (
      ""
    );

  let button =
    type === 1 ? (
      <button className="btn btn-primary m-3" onClick={() => updateVac(vacation)}>
        Update Vacation
      </button>
    ) : (
      <button className="btn btn-primary m-3" onClick={() => addNewVac()}>
        Add New Vacation
      </button>
    );

  return (
    <div className="col-12 ">
      {trashIcon}
      <div className="mb-3">{type === 1 ? <img src={vacation.img} className="card-img-top cardImg"></img> : ""}</div>
      <UploadImg></UploadImg>
      <div className="mb-3">
        <input type="text" className="form-control mt-2 " id="destination" onChange={(e) => onChangeFn(e, vacation, type)} placeholder="Destination" defaultValue={vacation.destination} />
        <div id="emailHelp" className="form-text"></div>
      </div>
      <div className="mb-3">
        <input type="text" className="form-control mt-2 " id="description" onChange={(e) => onChangeFn(e, vacation, type)} placeholder="description" defaultValue={vacation.description} />
      </div>
      <div className="mb-3">
        <input type="number" className="form-control mt-2 " id="price" onChange={(e) => onChangeFn(e, vacation, type)} placeholder="Change Price" defaultValue={vacation.price} />
      </div>
      <div className="mb-3">
        <input type="date" className="form-control mt-2 " id="initialDate" onChange={(e) => onChangeFn(e, vacation, type)} placeholder="Change Initial Date" defaultValue={vacation.initialDate} />
      </div>
      <div className="mb-3">
        <input type="date" className="form-control mt-2 " id="finalDate" onChange={(e) => onChangeFn(e, vacation, type)} placeholder="Change Final Date" defaultValue={vacation.finalDate} />
      </div>
      {button}
    </div>
  );
};

export default VacationForm;
