import React from "react";

const VacationCards = ({ vacation, onClickFn }) => {
  // let likes =
  //   isAdmin == 0 ? (

  //   ) : (
  //     <div>
  //       {" "}
  //       <i className="fas fa-edit float-start m-3"></i> <i className="fas fa-trash-alt float-end  m-3" onClick={() => removeVac(vacation.id)}></i>
  //     </div>
  //   );
  // let imgs =
  //   isAdmin == 0 ? (
  //   ) : (
  //     <div>
  //       <img src={vacation.img} className="card-img-top cardImg" /> <UploadImg></UploadImg>
  //     </div>
  //   );
  // console.log(typeof vacation.initialDate);
  // let destination = isAdmin == 0  : <input type="text" className="form-control mt-2 " id="destination" onChange={(e) => onChangeFn(e, vacation)} placeholder="Change Destination" defaultValue={vacation.destination} />;

  // let description = isAdmin == 0 ?  : <input type="text" className="form-control mt-2 " id="description" onChange={(e) => onChangeFn(e, vacation)} placeholder="description" defaultValue={vacation.description} />;

  // let price = isAdmin == 0 ? <h5 className="card-title">${vacation.price} </h5> : <input type="number" className="form-control mt-2 " id="price" onChange={(e) => onChangeFn(e, vacation)} placeholder="Change Price" defaultValue={vacation.price} />;

  // let initialDate = isAdmin == 0 ? <h5 className="card-title"> From : {vacation.initialDate} </h5> : <input type="datetime-local" className="form-control mt-2 " id="initialDate" onChange={(e) => onChangeFn(e, vacation)} placeholder="Change Initial Date" />;
  // defaultValue={vacation.initialDate.length > 10 ? vacation.initialDate.slice(0, 10) : vacation.initialDate}

  // let finalDate = isAdmin == 0 ? <h5 className="card-title"> Until : {vacation.finalDate} </h5> : <input type="datetime-local" className="form-control mt-2 " id="finalDate" onChange={(e) => onChangeFn(e, vacation)} placeholder="Change Final Date" />;
  // defaultValue={vacation.finalDate.length > 10 ? vacation.finalDate.slice(0, 10) : vacation.finalDate}
  // let updateVacationBTN =
  //   isAdmin == 0 ? (
  //     ""
  //   ) : (
  //     <button className="btn btn-primary m-3" onClick={() => updateVac(vacation)}>
  //       Update Vacation
  //     </button>
  //   );

  return (
    <div className="card ">
      <div className="row">
        <div className="col-12 ">
          <i className="fab fa-gratipay float-start m-3" onClick={() => onClickFn(vacation.id)}></i>
        </div>
      </div>
      <img src={vacation.img} className="card-img-top cardImg" />
      <div className="card-body">
        <h5 className="card-title">{vacation.destination}</h5>
        <h5 className="card-text"> {vacation.description}</h5>
        <h5 className="card-title"> From : {vacation.initialDate} </h5>
        <h5 className="card-title"> Until : {vacation.finalDate} </h5>
        <h5 className="card-title">${vacation.price} </h5>
      </div>
    </div>
  );
};

export default VacationCards;
