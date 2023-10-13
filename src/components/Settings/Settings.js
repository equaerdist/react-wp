import Search from "../Search/Search";
import "./Settings.scss";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Sender from "../sender/Sender";
import {
  setSettings,
  settingsInit,
  settingsUpdate,
  setText,
  setType,
  sendMessage,
} from "../../actions/settingsActions";
import config from "../../config";
import { useEffect, useState } from "react";
const Settings = (props) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.global);
  const { settings, settingsProcess } = useSelector((state) => state.settings);
  const request = useHttp();
  useEffect(() => {
    dispatch(settingsInit(request, config.api));
  }, [dispatch, request, project]);
  const onRequest = () => {
    dispatch(settingsUpdate(request, config.api, settings, project));
  };
  return (
    <main className="settings">
      <button
        className="button icon settings__button"
        onClick={() => setModal((state) => !state)}
      >
        Создать рассылку
      </button>
      {modal ? (
        <Sender
          open={modal}
          handleClose={() => setModal(false)}
          onSwitch={(value) => dispatch(setType(value))}
          onType={(value) => dispatch(setText(value))}
          onRequest={sendMessage}
        ></Sender>
      ) : null}
      <div className="wrapper">
        <div className="settings__input">
          <div className="button icon settings__input-head">
            Процент на пополнение
          </div>
          <div className="settings__input-body">
            <Search
              val={settings.commissionInputUsdt}
              onInput={(value) =>
                dispatch(
                  setSettings({
                    ...settings,
                    commissionInputUsdt: value,
                  })
                )
              }
              label="USDT"
            ></Search>
            <Search
              val={settings.commissionInputTon}
              onInput={(value) =>
                dispatch(
                  setSettings({
                    ...settings,
                    commissionInputTon: value,
                  })
                )
              }
              label="TON"
            ></Search>
            <Search
              val={settings.commissionInputDel}
              onInput={(value) =>
                dispatch(
                  setSettings({
                    ...settings,
                    commissionInputDel: value,
                  })
                )
              }
              label="DEL"
            ></Search>
          </div>
        </div>
        <div className="settings__referral">
          <div className="button icon settings__referral-head">
            Процент реферального вознаграждения
          </div>
          <div className="settings__referral-body">
            <Search
              val={
                project && !project.includes("god")
                  ? settings.referralRewardLvl1
                  : settings.refferalRewardLvl1
              }
              onInput={(value) =>
                dispatch(
                  setSettings({
                    ...settings,
                    refferalRewardLvl1: value,
                    referralRewardLvl1: value,
                  })
                )
              }
              label="1 уровень"
            ></Search>
            <Search
              val={
                project && !project.includes("god")
                  ? settings.referralRewardLvl2
                  : settings.refferalRewardLvl2
              }
              onInput={(value) =>
                dispatch(
                  setSettings({
                    ...settings,
                    refferalRewardLvl2: value,
                    referralRewardLvl2: value,
                  })
                )
              }
              label="2 уровень"
            ></Search>
            {project && !project.includes("god") ? (
              <Search
                val={settings.referralRewardLvl3}
                onInput={(value) =>
                  dispatch(
                    setSettings({
                      ...settings,
                      referralRewardLvl3: value,
                    })
                  )
                }
                label="3 уровень"
              ></Search>
            ) : null}
          </div>
        </div>
      </div>
      <div className="settings__output">
        <div className="button icon settings__output-head">
          Процент на вывод
        </div>
        <div className="settings__output-body">
          <Search
            val={settings.commissionOutputUsdt}
            onInput={(value) =>
              dispatch(
                setSettings({
                  ...settings,
                  commissionOutputUsdt: value,
                })
              )
            }
            label="USDT"
          ></Search>
          <Search
            val={settings.commissionOutputTon}
            onInput={(value) =>
              dispatch(
                setSettings({
                  ...settings,
                  commissionOutputTon: value,
                })
              )
            }
            label="TON"
          ></Search>
          <Search
            val={settings.commissionOutputDel}
            onInput={(value) =>
              dispatch(
                setSettings({
                  ...settings,
                  commissionOutputDel: value,
                })
              )
            }
            label="DEL"
          ></Search>
        </div>
      </div>
      {settingsProcess === "loading" ? (
        <LinearProgress sx={{ mt: "20px", width: "381px" }} color="inherit" />
      ) : null}
      {settingsProcess === "error" ? (
        <Alert severity="error" sx={{ mt: "20px", width: "381px" }}>
          <AlertTitle>Ошибка</AlertTitle>
          Произошла ошибка при применении настроек —
          <strong>попробуйте снова!</strong>
        </Alert>
      ) : null}
      <button
        className="button settings__save"
        disabled={settingsProcess === "loading"}
        onClick={onRequest}
      >
        Сохранить изменения
      </button>
    </main>
  );
};
export default Settings;
