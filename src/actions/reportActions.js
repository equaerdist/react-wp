import { createAction } from "@reduxjs/toolkit";
const walletReport = createAction("REPORT_SET_WALLET");
const referralReport = createAction("REPORT_SET_REFERRAL");
const userReport = createAction("REPORT_SET_USER");
const userReportFetching = createAction("REPORT_LOADING_USER");
const walletReportFetching = createAction("REPORT_LOADING_WALLET");
const referralReportFetching = createAction("REPORT_LOADING_REFERRAL");
const referallError = createAction("REPORT_ERROR_REFERRAL");
const userError = createAction("REPORT_ERROR_USER");
const walletError = createAction("REPORT_ERROR_WALLET");
const graphError = createAction("REPORT_GRAPH_ERROR");
const graphLoading = createAction("REPORT_GRAPH_LOADING");
const setGraphData = createAction("REPORT_GRAPH_SET");
const setFirstTime = createAction("REPORT_SET_FIRST_TIME");
const setSecondTime = createAction("REPORT_SET_SECOND_TIME");
const setGroup = createAction("REPORT_SET_GROUP");
const setWalletFirstTime = createAction("REPORT_SET_WALLET_FIRST_TIME");
const setWalletLastTime = createAction("REPORT_SET_WALLET_LAST_TIME");
export {
  walletReport,
  referralReport,
  userReport,
  userReportFetching,
  walletReportFetching,
  referralReportFetching,
  referallError,
  userError,
  walletError,
  graphError,
  graphLoading,
  setGraphData,
  setSecondTime,
  setFirstTime,
  setGroup,
  setWalletFirstTime,
  setWalletLastTime,
};
