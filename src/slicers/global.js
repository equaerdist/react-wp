import { createSlice, createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  project: "poleteli_vpn",
};
const actions = createAction("GLOBAL_SET_PROJECT");
const reducers = createReducer(initialState, (builder) => {
  builder
    .addCase(actions, (state, action) => {
      state.project = action.payload;
    })
    .addDefaultCase((state) => {});
});
export { reducers, actions };
