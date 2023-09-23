const setSettings = (payload) => ({
  type: "SETTINGS_SET_SETTINGS",
  payload,
});
const settingsInit = (request, api) => (dispatch) => {
  dispatch("SETTINGS_LOADING_SETTINGS");
  request(`${api}/settings`)
    .then((settings) => dispatch(setSettings(settings)))
    .catch(() => dispatch("SETTINGS_ERROR_SETTINGS"));
};
const settingsUpdate = (request, api, oldSettings) => (dispatch) => {
  dispatch("SETTINGS_LOADING_SETTINGS");
  request(`${api}/settings`, oldSettings, "PUT")
    .then(() => dispatch(setSettings(oldSettings)))
    .catch(() => dispatch("SETTINGS_ERROR_SETTINGS"));
};
export { setSettings, settingsInit, settingsUpdate };
