import { createAction } from "@reduxjs/toolkit";
import { dispatch } from "d3";

const setSettings = (payload) => ({
  type: "SETTINGS_SET_SETTINGS",
  payload,
});
const setText = createAction("SETTINGS_SET_TEXT");
const setType = createAction("SETTINGS_SET_TYPE");
const setSelectedSettings = createAction("SETTINGS_SET_SELECTED");
const settingsInit = (request, api) => (dispatch) => {
  dispatch("SETTINGS_LOADING_SETTINGS");
  request(`${api}`)
    .then((settings) => {
      dispatch(setSettings(settings));
    })
    .catch(() => dispatch("SETTINGS_ERROR_SETTINGS"));
};
const setNewSettings = (request, api, oldSettings) => (dispatch) => {
  dispatch("SETTINGS_LOADING_SETTINGS");
  request(`${api}`)
    .then((settings) => {
      dispatch(setSettings([...oldSettings, ...settings]));
    })
    .catch(() => dispatch("SETTINGS_ERROR_SETTINGS"));
};
const settingsUpdate = (request, api, oldSettings, oldArray) => (dispatch) => {
  dispatch("SETTINGS_LOADING_SETTINGS");
  request(`${api}/settings`, oldSettings, "PUT")
    .then(() => {
      dispatch(setSelectedSettings(oldSettings));
      dispatch(
        setSettings(
          oldArray.map((item) =>
            item.name === oldSettings.name ? oldSettings : item
          )
        )
      );
    })
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
  setSelectedSettings,
  setNewSettings,
};
