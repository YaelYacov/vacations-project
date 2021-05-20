const initialState = {
  isLoggedIn: false,
  isRegistered: false,
  users: [],
  vacations: [],
};

function rootReducer(state = initialState, action) {
  // console.log("Root : ", action, state);

  switch (action.type) {
    case "updateIsLoggedIn":
      state = { ...state, isLoggedIn: action.payload };
      break;
    case "updateIsRegistered":
      state = { ...state, isRegistered: action.payload };
      break;
    case "updateUsers":
      state = { ...state, users: action.payload };
      break;
    case "updateVacations":
      state = { ...state, vacations: action.payload };
      break;
  }
  return state;
}

export default rootReducer;