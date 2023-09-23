const initialState = {
  users: [],
  freeUsers: [],
  userProcess: "idle",
  page: 1,
  freePage: 1,
  freeProcess: "idle",
  freeSelected: [],
  selectedUsers: [],
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SET_SELECTED":
      return { ...state, selectedUsers: action.payload };
    case "USER_SET_FREE_SELECTED":
      return { ...state, freeSelected: action.payload };
    case "USER_SET_USERS":
      return { ...state, users: [...action.payload], userProcess: "idle" };
    case "USER_SET_FREE_USERS":
      return { ...state, freeUsers: [...action.payload], freeProcess: "idle" };
    case "USER_LOADING_USERS":
      return { ...state, userProcess: "loading" };
    case "USER_ERROR_USERS":
      return { ...state, userProcess: "error" };
    case "USER_SET_PAGE":
      return { ...state, page: action.payload };
    case "USER_SET_FREE_PAGE":
      return { ...state, freePage: action.payload };
    case "USER_LOADING_FREE_USERS":
      return { ...state, freeProcess: "loading" };
    case "USER_ERROR_FREE_USERS":
      return { ...state, freeProcess: "error" };
    default:
      return state;
  }
};
export default user;
