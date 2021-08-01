import * as Api from "../api/apiCalls";

export let getData = async () => {
  let getAllVacations = await Api.postRequest(`/vacations/getAllVacations`);
  //   console.log(getAllVacations);

  if (getAllVacations.statusText === "OK" && getAllVacations.status === 200) {
    console.log(getAllVacations);
    return getAllVacations;
  }
};
