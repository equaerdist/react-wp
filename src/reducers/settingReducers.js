const initialState = {
  settings: [],
  selectedSettings: null,
  settingsProcess: "idle",
  text: "",
  type: false,
  messageProcess: "idle",
};
const settings = (state = initialState, action) => {
  switch (action.type) {
    case "SETTINGS_SET_SELECTED":
      return { ...state, selectedSettings: action.payload };
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
