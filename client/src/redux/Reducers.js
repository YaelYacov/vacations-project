const initialState = {
  isLoggedIn: false,
  user: [],
  vacations: [],
  newVac: false,
  currentVacId: 0,
  newImgName: "",
  usersVacations: [],
  isAdminAndVacPath: false,
};

function rootReducer(state = initialState, action) {
  // console.log("Root : ", action, state);

  switch (action.type) {
    case "updateIsLoggedIn":
      state = { ...state, isLoggedIn: action.payload };
      break;
    case "updateUser":
      state = { ...state, user: action.payload };
      break;
    case "updateVacations":
      state = { ...state, vacations: action.payload };
      break;
    case "updateAddNewVac":
      state = { ...state, newVac: action.payload };
      break;
    case "updateCurrentVacId":
      state = { ...state, currentVacId: action.payload };
      break;
    case "updateNewImgName":
      state = { ...state, newImgName: action.payload };
      break;
    case "updateUsersVacations":
      state = { ...state, usersVacations: action.payload };
      break;
    case "updateIsAdminAndVacPath":
      state = { ...state, isAdminAndVacPath: action.payload };
      break;
  }
  return state;
}

export default rootReducer;
