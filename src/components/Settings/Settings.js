import Search from "../Search/Search";
import "./Settings.scss";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Sender from "../sender/Sender";
import { useMemo } from "react";
import useSort from "../../hooks/useSort";
import {
  setNewSettings,
  setSettings,
  settingsInit,
  settingsUpdate,
  setSelectedSettings,
  setText,
  setType,
  sendMessage,
} from "../../actions/settingsActions";
import config from "../../config";
import { useEffect, useState } from "react";
import ColumnGroupingTable from "../EndedTable/EndedTable";
import TableWrapper from "../TableWrapper/TableWrapper";
import { Tab } from "@mui/material";
import { createSettingColumns } from "../../dataTransform/settingsTransform";
import SettingsEditor from "../SettingsEditor/SettingsEditor";
const Settings = (props) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.global);

  const { settings, settingsProcess, selectedSettings } = useSelector(
    (state) => state.settings
  );
  const { onSortSet, page, pageSize, sortParam, sortOrder, setPage } =
    useSort();
  const request = useHttp();
  const setNewPage = () => {
    if (
      settings.length % pageSize === 0 &&
      settingsProcess === "idle" &&
      page * pageSize === settings.length
    )
      setPage((page) => page + 1);
  };
  const isSelected = (item) => {
    return item?.name === selectedSettings?.name;
  };
  const onSelected = (item) => {
    dispatch(setSelectedSettings(item));
  };
  useEffect(() => {
    dispatch(
      settingsInit(
        request,
        `${
          config.api
        }/settings?sortOrder=${sortOrder}&sortParam=${sortParam}&page=${1}&pageSize=${pageSize}`
      )
    );
    setPage(1);
  }, [dispatch, request, project, pageSize, sortParam, sortOrder]);
  useEffect(() => {
    if (page !== 1) {
      dispatch(
        setNewSettings(
          request,
          `${config.api}/settings?sortOrder=${sortOrder}&sortParam=${sortParam}&page=${page}&pageSize=${pageSize}`,
          settings
        )
      );
    }
  }, [dispatch, page, request]);
  const onRequest = (newSettings) => {
    dispatch(settingsUpdate(request, config.api, newSettings, settings));
  };
  const handleClose = () => {
    dispatch(setSelectedSettings(null));
  };
  const labels = useMemo(
    () => (settings.length > 0 ? createSettingColumns(settings[0]) : []),
    [settings]
  );
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
      {selectedSettings ? (
        <SettingsEditor
          process={settingsProcess}
          onRequest={onRequest}
          handleClose={handleClose}
          {...selectedSettings}
        ></SettingsEditor>
      ) : null}
      {/*  <div className="wrapper">
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
      </div> */}
      {TableWrapper(
        ColumnGroupingTable,
        settings,
        labels,
        settingsProcess,
        sortOrder,
        sortParam,
        (prop) => {
          onSortSet(prop);
        },
        setNewPage,
        isSelected,
        onSelected
      )}
    </main>
  );
};
export default Settings;
