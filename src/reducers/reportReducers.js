import { createReducer } from "@reduxjs/toolkit";
import {
  walletReport,
  userReport,
  referralReport,
  userReportFetching,
  walletReportFetching,
  referralReportFetching,
  walletError,
  userError,
  referallError,
  graphError,
  graphLoading,
  setGraphData,
  setFirstTime,
  setSecondTime,
  setGroup,
  setWalletFirstTime,
  setWalletLastTime,
} from "../actions/reportActions";
const initialState = {
  walletProcess: "idle",
  wallet: {},
  referralProcess: "idle",
  referral: {},
  userProcess: "idle",
  user: {},
  graphProcess: "idle",
  graphData: {},
  firstTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 3)
    .toISOString()
    .split("T")[0],
  lastTime: new Date().toISOString().split("T")[0],
  group: "day",
  walletFirstTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7)
    .toISOString()
    .split("T")[0],
  walletLastTime: new Date().toISOString().split("T")[0],
};
const report = createReducer(initialState, (builder) => {
  builder
    .addCase(walletReport, (state, action) => {
      state.wallet = action.payload;
      state.walletProcess = "idle";
    })
    .addCase(userReport, (state, action) => {
      state.user = action.payload;
      state.userProcess = "idle";
    })
    .addCase(referralReport, (state, action) => {
      state.referral = action.payload;
      state.referralProcess = "idle";
    })
    .addCase(userReportFetching, (state) => {
      state.userProcess = "loading";
    })
    .addCase(referralReportFetching, (state) => {
      state.referralProcess = "loading";
    })
    .addCase(walletReportFetching, (state) => {
      state.walletProcess = "loading";
    })
    .addCase(walletError, (state) => {
      state.walletProcess = "error";
    })
    .addCase(userError, (state) => {
      state.userProcess = "error";
    })
    .addCase(referallError, (state) => {
      state.referralProcess = "error";
    })
    .addCase(graphError, (state) => {
      state.graphProcess = "error";
    })
    .addCase(graphLoading, (state) => {
      state.graphProcess = "loading";
    })
    .addCase(setGraphData, (state, action) => {
      state.graphData = action.payload;
      state.graphProcess = "idle";
    })
    .addCase(setFirstTime, (state, action) => {
      state.firstTime = action.payload;
    })
    .addCase(setSecondTime, (state, action) => {
      state.lastTime = action.payload;
    })
    .addCase(setGroup, (state, action) => {
      state.group = action.payload;
    })
    .addCase(setWalletFirstTime, (state, action) => {
      state.walletFirstTime = action.payload;
    })
    .addCase(setWalletLastTime, (state, action) => {
      state.walletLastTime = action.payload;
    })
    .addDefaultCase(() => {});
});
export default report;
