import Search from "../Search/Search";
import "./Settings.scss";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  setSettings,
  settingsInit,
  settingsUpdate,
} from "../../actions/settingsActions";
import config from "../../config";
import { useEffect } from "react";
const Settings = (props) => {
  const dispatch = useDispatch();
  const { settings, settingsProcess } = useSelector((state) => state.settings);
  const request = useHttp();
  useEffect(() => {
    dispatch(settingsInit(request, config.api));
  }, [dispatch, request]);
  const onRequest = () => {
    dispatch(settingsUpdate(request, config.api, settings));
  };
  return (
    <main className="settings">
      <button className="button icon settings__button">Создать рассылку</button>
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
                    commissionInputUsdt: parseInt(value),
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
                    commissionInputTon: parseInt(value),
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
                    commissionInputDel: parseInt(value),
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
              val={settings.referralRewardLvl1}
              onInput={(value) =>
                dispatch(
                  setSettings({
                    ...settings,
                    referralRewardLvl1: parseInt(value),
                  })
                )
              }
              label="1 уровень"
            ></Search>
            <Search
              val={settings.referralRewardLvl2}
              onInput={(value) =>
                dispatch(
                  setSettings({
                    ...settings,
                    referralRewardLvl2: parseInt(value),
                  })
                )
              }
              label="2 уровень"
            ></Search>
            <Search
              val={settings.referralRewardLvl3}
              onInput={(value) =>
                dispatch(
                  setSettings({
                    ...settings,
                    referralRewardLvl3: parseInt(value),
                  })
                )
              }
              label="3 уровень"
            ></Search>
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
                  commissionOutputUsdt: parseInt(value),
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
                  commissionOutputTon: parseInt(value),
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
                  commissionOutputDel: parseInt(value),
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
