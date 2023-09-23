const initialState = {
  settings: {
    id: 0,
    commissionOutputDel: 0,
    commissionOutputTon: 0,
    commissionOutputUsdt: 0,
    commissionOutputRub: 0,
    commissionInputDel: 0,
    commissionInputTon: 0,
    commissionInputUsdt: 0,
    referralRewardLvl1: 0,
    referralRewardLvl2: 0,
    referralRewardLvl3: 0,
    minOutput: 0,
  },
  settingsProcess: "idle",
};
const settings = (state = initialState, action) => {
  switch (action.type) {
    case "SETTINGS_SET_SETTINGS":
      return { ...state, settings: action.payload, settingsProcess: "idle" };
    case "SETTINGS_LOADING_SETTINGS":
      return { ...state, settingsProcess: "loading" };
    case "SETTINGS_ERROR_SETTINGS":
      return { ...state, settingsProcess: "error" };
    default:
      return state;
  }
};
export default settings;
