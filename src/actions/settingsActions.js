import { createAction } from "@reduxjs/toolkit";

const setSettings = (payload) => ({
  type: "SETTINGS_SET_SETTINGS",
  payload,
});
const setText = createAction("SETTINGS_SET_TEXT");
const setType = createAction("SETTINGS_SET_TYPE");
const settingsInit = (request, api) => (dispatch) => {
  dispatch("SETTINGS_LOADING_SETTINGS");
  request(`${api}/settings`)
    .then((settings) => {
      dispatch(setSettings(settings));
    })
    .catch(() => dispatch("SETTINGS_ERROR_SETTINGS"));
};
const settingsUpdate = (request, api, oldSettings, project) => (dispatch) => {
  dispatch("SETTINGS_LOADING_SETTINGS");
  let modifiedSettings = oldSettings;
  Object.keys(oldSettings).forEach((item) => {
    if (parseFloat(modifiedSettings[item]) && item !== "updatedAt") {
      modifiedSettings[item] = parseFloat(modifiedSettings[item]);
    }
  });
  if (project && project.includes("god")) {
    delete modifiedSettings.referralRewardLvl2;
    delete modifiedSettings.referralRewardLvl1;
  }
  request(`${api}/settings`, modifiedSettings, "PUT")
    .then(() => dispatch(setSettings(oldSettings)))
    .catch(() => dispatch("SETTINGS_ERROR_SETTINGS"));
};
const sendMessage = (request, api, type, text) => (dispatch) => {
  dispatch("SETTINGS_LOADING_MESSAGE");
  request(`${api}/settings/message`, { type, text }, "POST")
    .then(() => dispatch("idle"))
    .catch(() => dispatch("SETTINGS_ERROR_MESSAGE"));
};
export {
  setSettings,
  settingsInit,
  settingsUpdate,
  setText,
  setType,
  sendMessage,
};
