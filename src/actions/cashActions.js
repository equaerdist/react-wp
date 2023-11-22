import { cashTranformGiven } from "../dataTransform/cashTransform";
import elemInArrayById from "../tools/arrayTool";
const receivedGiven = (payload) => ({ type: "CASH_RECEIVE_GIVEN", payload });
const receivedRequests = (payload) => ({
  type: "CASH_RECEIVE_REQUESTS",
  payload,
});
const addedGiven = (payload) => ({ type: "CASH_ADD_GIVEN", payload });
const addedRequests = (payload) => ({ type: "CASH_ADD_REQUESTS", payload });
export {
  receivedGiven as receivedCashes,
  receivedRequests,
  addedGiven,
  addedRequests,
};

const requestClick = (api, request, requestNotes, selected) => (dispatch) => {
  dispatch("CASH_LOADING_REQUESTS");
  request(
    `${api}/cash/request`,
    {
      PayRequests: selected.map((item) => ({ id: item.id, statusPay: 1 })),
    },
    "PUT"
  )
    .then(() => {
      const given = requestNotes.filter(
        (item) => !elemInArrayById(item, selected)
      )[0];
      if (given) dispatch(addedGiven(given));
      dispatch(
        receivedRequests(
          requestNotes.filter((item) => elemInArrayById(item, selected))
        )
      );
      dispatch("CASH_RESET_SELECTED");
    })
    .catch((e) => {
      dispatch("CASH_ERROR_REQUESTS");
    });
};
const initCashGiven =
  (request, api, pageSize, sortParam, sortOrder, searchTerm) => (dispatch) => {
    if (!searchTerm) searchTerm = "";
    dispatch("CASH_LOADING_GIVEN");
    request(
      `${api}/cash/given?page=${1}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${searchTerm}`
    )
      .then((data) => {
        return cashTranformGiven(data);
      })
      .then((data) => {
        dispatch(receivedGiven(data));
      })
      .catch(() => dispatch("CASH_ERROR_GIVEN"));
  };
const initCashRequest =
  (pageSize, request, api, sortOrder, sortParam, searchTerm) => (dispatch) => {
    if (!searchTerm) searchTerm = "";
    dispatch("CASH_LOADING_REQUESTS");
    request(
      `${api}/cash/request?page=${1}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${searchTerm}`
    )
      .then((data) => cashTranformGiven(data))
      .then((data) => dispatch(receivedRequests(data)))
      .catch((e) => {
        dispatch("CASH_ERROR_REQUESTS");
      });
  };
const givenPaged =
  (api, request, Page, pageSize, sortParam, sortOrder, givenTerm) =>
  (dispatch) => {
    dispatch("CASH_LOADING_GIVEN");
    request(
      `${api}/cash/given?page=${Page}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${givenTerm}`
    )
      .then(cashTranformGiven)
      .then((data) => {
        dispatch(addedGiven(data));
      })
      .catch(() => dispatch("CASH_ERROR_GIVEN"));
  };
const requestPaged =
  (api, request, page, pageSize, sortParam, sortOrder, term) => (dispatch) => {
    dispatch("CASH_LOADING_REQUESTS");
    request(
      `${api}/cash/request?page=${page}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${term}`
    )
      .then(cashTranformGiven)
      .then((data) => {
        dispatch(addedRequests(data));
      })
      .catch(() => dispatch("CASH_ERROR_REQUESTS"));
  };
const inputGiven = (payload) => ({ type: "CASH_INPUT_GIVEN", payload });
const inputRequest = (payload) => ({ type: "CASH_INPUT_REQUESTS", payload });
const selectRequest = (request) => ({
  type: "CASH_ADD_SELECTED",
  payload: request,
});
const removeSelect = (request) => ({
  type: "CASH_REMOVE_SELECTED",
  payload: request,
});

export {
  selectRequest,
  initCashGiven,
  initCashRequest,
  givenPaged,
  requestPaged,
  inputGiven,
  inputRequest,
  removeSelect,
  requestClick,
};
