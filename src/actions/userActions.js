import elemInArrayById from "../tools/arrayTool";
import { userTransform } from "../dataTransform/userTransform";
const setUsers = (payload) => ({ type: "USER_SET_USERS", payload });
const setFreeUsers = (payload) => ({ type: "USER_SET_FREE_USERS", payload });
const setPage = (payload) => ({ type: "USER_SET_PAGE", payload });
const setFreePage = (payload) => ({ type: "USER_SET_FREE_PAGE", payload });
const setFreeSelected = (payload) => ({
  type: "USER_SET_FREE_SELECTED",
  payload,
});
const onFreeInit =
  (request, api, page, pageSize, sortParam, sortOrder, term, old) =>
  (dispatch) => {
    dispatch("USER_LOADING_FREE_USERS");
    request(
      `${api}/user/demo?page=${page}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${term}`
    )
      .then(userTransform)
      .then((data) => dispatch(setFreeUsers([...old, ...data])))
      .catch(() => dispatch("USER_ERROR_FREE_USERS"));
  };
const onPaged =
  (request, api, page, pageSize, sortParam, sortOrder, term, users) =>
  (dispatch) => {
    dispatch("USER_LOADING_USERS");
    request(
      `${api}/user?pageSize=${pageSize}&page=${page}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${term}`
    )
      .then(userTransform)
      .then((data) => dispatch(setUsers([...users, ...data])))
      .catch(() => dispatch("USER_ERROR_USERS"));
  };
const onInit =
  (request, api, sortParam, sortOrder, term, pageSize) => (dispatch) => {
    dispatch("USER_LOADING_USERS");
    dispatch(setPage(1));
    request(
      `${api}/user?pageSize=${pageSize}&page=${1}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${term}`
    )
      .then(userTransform)
      .then((data) => dispatch(setUsers([...data])))
      .catch((e) => console.log(e.message) /* dispatch("USER_ERROR_USERS") */);
  };

const applyFree = (request, api, selected, duration, all) => (dispatch) => {
  dispatch("USER_LOADING_FREE_USERS");
  request(
    `${api}/user/demo`,
    selected.map((item) => ({ id: item.id, duration })),

    "PUT"
  )
    .then(() => {
      dispatch(
        setFreeUsers(all.filter((item) => elemInArrayById(item, selected)))
      );
      dispatch(setFreeSelected([]));
    })
    .catch(() => dispatch("USER_ERROR_FREE_USERS"));
};
const onFreeSort =
  (request, api, sortParam, pageSize, sortOrder) => (dispatch) => {
    dispatch("USER_LOADING_FREE_USERS");
    request(
      `${api}/user/demo?page=${1}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=`
    )
      .then(userTransform)
      .then((data) => dispatch(setFreeUsers([...data])))
      .catch(() => dispatch("USER_ERROR_FREE_USERS"));
  };
const setSelected = (payload) => ({ type: "USER_SET_SELECTED", payload });

const onActiveRequest = (request, api, selected, old) => (dispatch) => {
  dispatch("USER_LOADING_USERS");
  request(
    `${api}/user`,
    selected.map((item) => item.id),
    "PUT"
  )
    .then(() => {
      dispatch(setSelected([]));
      dispatch(
        setUsers(
          old.map((item) => {
            if (elemInArrayById(item, selected)) return item;
            item.status = 1;
            return item;
          })
        )
      );
    })
    .catch(() => dispatch("USER_ERROR_USERS"));
};
export {
  setUsers,
  setFreeUsers,
  setPage,
  onPaged,
  onInit,
  setFreePage,
  setFreeSelected,
  onFreeInit,
  onFreeSort,
  applyFree,
  setSelected,
  onActiveRequest,
};
