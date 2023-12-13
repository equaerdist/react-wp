const initialState = {
  requests: [],
  given: [],
  requestProcess: "idle",
  givenProcess: "idle",
  givenTerm: "",
  requestTerm: "",
  selectedRequests: [],
  requestPage: 1,
  givenPage: 1,
};
const cash = (state = initialState, action) => {
  switch (action.type) {
    case "CASH_ADD_SELECTED": {
      return {
        ...state,
        selectedRequests: [...state.selectedRequests, action.payload],
      };
    }
    case "CASH_REMOVE_SELECTED": {
      return {
        ...state,
        selectedRequests: state.selectedRequests.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }
    case "CASH_RESET_SELECTED":
      return { ...state, selectedRequests: [] };
    case "CASH_RECEIVE_GIVEN":
      return {
        ...state,
        given: action.payload,
        givenProcess: "idle",
      };
    case "CASH_RECEIVE_REQUESTS":
      return {
        ...state,
        requests: action.payload,
        requestProcess: "idle",
      };
    case "CASH_LOADING_REQUESTS":
      return { ...state, requestProcess: "loading" };
    case "CASH_ERROR_REQUESTS":
      return { ...state, requestProcess: "error" };
    case "CASH_LOADING_GIVEN":
      return { ...state, givenProcess: "loading" };
    case "CASH_ERROR_GIVEN":
      return { ...state, givenProcess: "error" };
    case "CASH_ADD_GIVEN":
      return {
        ...state,
        given: [...action.payload, ...state.given],
        givenProcess: "idle",
      };
    case "CASH_ADD_REQUESTS":
      return {
        ...state,
        requests: [...state.requests, ...action.payload],
        requestProcess: "idle",
      };
    case "CASH_INPUT_GIVEN":
      return { ...state, givenTerm: action.payload };
    case "CASH_INPUT_REQUESTS":
      return { ...state, requestTerm: action.payload };
    case "CASH_PAGED_GIVEN":
      return { ...state, givenPage: action.payload };
    case "CASH_PAGED_REQUESTS":
      return { ...state, requestPage: action.payload };
    default:
      return state;
  }
};
export default cash;
