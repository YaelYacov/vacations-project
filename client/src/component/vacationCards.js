import React from "react";
import VacationFrom from "../component/vacationForm";

const VacationCards = ({ vacation, addVacToFavoritesFN, editVac, removeVac, onChangeFn, updateVac, user }) => {
  let ifLikedClass = "";
  let filteredVacs = [];

  if (vacation.usersVacations.length > 0) {
    filteredVacs = vacation.usersVacations.filter((userVac) => userVac.userId === user.id);
    ifLikedClass = filteredVacs.length > 0 ? "fas fa-heart  float-start m-3" : "fab fa-gratipay  float-start m-3";
  } else ifLikedClass = "fab fa-gratipay float-start m-3";

  return (
    <div className="card cardShadow cardHeight">
      {!vacation.isEditVac ? (
        <div>
          <div className="row">
            <div className="col-12 ">
              {user.isAdmin === 0 ? (
                <i className={ifLikedClass} onClick={() => addVacToFavoritesFN(vacation.id)}></i>
              ) : (
                <div>
                  <i className="fas fa-edit float-start m-3" onClick={() => editVac(vacation.id)}></i> <i className="fas fa-trash-alt float-end  m-3" onClick={() => removeVac(vacation.id)}></i>
                </div>
              )}
            </div>
          </div>
          <img src={vacation.img} className="card-img-top cardImg " />
          <div className="card-body ">
            <h3 className="card-title pt-2">{vacation.destination}</h3>
            <br></br>
            <h5 className="card-text"> Description : </h5>
            <p>{vacation.description}</p>
            <br></br>

            <h5> From : </h5>
            <p>{vacation.initialDate}</p>

            <br></br>

            <h5> Until : </h5>
            <p>{vacation.finalDate}</p>
            <br></br>

            <h5> Followers : </h5>
            <p>{vacation.usersVacations.length}</p>
            <br></br>
            <h5> Price : </h5>
            <p>${vacation.price}</p>
          </div>
        </div>
      ) : (
        <VacationFrom type={1} vacation={vacation} onChangeFn={onChangeFn} updateVac={updateVac} removeVac={removeVac} editVac={editVac}></VacationFrom>
      )}
    </div>
  );
};

export default VacationCards;
