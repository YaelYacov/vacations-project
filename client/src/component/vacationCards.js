import React from "react";
import VacationFrom from "../component/vacationForm";

const VacationCards = ({ vacation, addVacToFavoritesFN, isAdmin, editVac, removeVac, onChangeFn, updateVac, currentVacFavoriteId }) => {
  let isLiked = currentVacFavoriteId >= 0 ? "fas fa-heart  float-start m-3" : "fab fa-gratipay  float-start m-3";
  return (
    <div className="card ">
      {!vacation.isEditVac ? (
        <div>
          <div className="row">
            <div className="col-12 ">
              {isAdmin == 0 ? (
                // <i class="fas fa-heart"></i>
                <i className={isLiked} onClick={() => addVacToFavoritesFN(vacation.id)}></i>
              ) : (
                <div>
                  <i className="fas fa-edit float-start m-3" onClick={() => editVac(vacation.id)}></i> <i className="fas fa-trash-alt float-end  m-3" onClick={() => removeVac(vacation.id)}></i>
                </div>
              )}
            </div>
          </div>
          <img src={vacation.img} className="card-img-top cardImg" />
          <div className="card-body">
            <h5 className="card-title">{vacation.destination}</h5>
            <h5 className="card-text"> {vacation.description}</h5>
            <h5 className="card-title"> From : {vacation.initialDate} </h5>
            <h5 className="card-title"> Until : {vacation.finalDate} </h5>
            <h5 className="card-title">${vacation.price} </h5>
            <h5 className="card-title">Followers : {vacation.followers} </h5>
          </div>
        </div>
      ) : (
        // <VacationFrom type={1} addNewVac={this.addNewVac} vacation={vacation} onChangeFn={this.onChangeFn}></VacationFrom>
        <VacationFrom type={1} vacation={vacation} onChangeFn={onChangeFn} updateVac={updateVac} removeVac={removeVac} editVac={editVac}></VacationFrom>
      )}
    </div>
  );
};

export default VacationCards;
