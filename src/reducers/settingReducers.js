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
  text: "",
  type: false,
  messageProcess: "idle",
};
const settings = (state = initialState, action) => {
  switch (action.type) {
    case "SETTINGS_SET_SETTINGS":
      return { ...state, settings: action.payload, settingsProcess: "idle" };
    case "SETTINGS_LOADING_SETTINGS":
      return { ...state, settingsProcess: "loading" };
    case "SETTINGS_ERROR_SETTINGS":
      return { ...state, settingsProcess: "error" };
    case "SETTINGS_SET_TEXT":
      return { ...state, text: action.payload };
    case "SETTINGS_SET_TYPE":
      return { ...state, type: action.payload };
    case "SETTINGS_LOADING_MESSAGE":
      return { ...state, messageProcess: "loading" };
    case "idle":
      return { ...state, messageProcess: "idle" };
    case "SETTINGS_ERROR_MESSAGE":
      return { ...state, messageProcess: "error" };
    default:
      return state;
  }
};
export default settings;
