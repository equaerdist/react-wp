import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import report from "../reducers/reportReducers";

import cash from "../reducers/cashReducers";
import thunk from "redux-thunk";
import user from "../reducers/userReducers";
import referral from "../reducers/referralReducers";
import tariff from "../reducers/tariffReducer";
import settings from "../reducers/settingReducers";
const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({ type: action });
  }
  return next(action);
};

const store = createStore(
  combineReducers({ report, cash, user, referral, tariff, settings }),
  compose(
    applyMiddleware(thunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
