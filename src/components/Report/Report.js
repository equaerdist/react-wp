import Table from "../Table/Table";
import "./Report.scss";
import useHttp from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import config from "../../config";
import walletTransform from "../../dataTransform/transform";
import Graph from "../Graph/Graph";
import {
  walletReport,
  userReport,
  referralReport,
  setFirstTime,
  setSecondTime,
  graphError,
  graphLoading,
  setGraphData,
  setGroup,
} from "../../actions/reportActions";
const Report = (props) => {
  const request = useHttp();
  const dispatch = useDispatch();

  const walletReportObj = useSelector((state) => state.report.wallet);
  const walletArray = useMemo(() => [walletReportObj], [walletReportObj]);
  const walletHeaders = useMemo(() => ["Всего", "Заморожено", "Доступно"], []);

  const referralReportObj = useSelector((state) => state.report.referral);
  const referralHeaders = useMemo(() => ["Всего", "Отдано", "Сохранено"], []);
  const referralArray = useMemo(() => [referralReportObj], [referralReportObj]);

  const userReportObj = useSelector((state) => state.report.user);
  const userSection = { ...userReportObj };
  delete userSection.repeatedPay;
  const userHeaders = useMemo(() => ["Всего", "Активных", "Неактивных"], []);
  // eslint-disable-next-line
  const userArray = useMemo(() => [userSection], [userReportObj]);
  const repeatedPayHeaders = useMemo(() => ["Всего"], []);
  const repeatedObj = { ...userReportObj };
  delete repeatedObj.active;
  delete repeatedObj.notActive;
  delete repeatedObj.all;
  // eslint-disable-next-line
  const repeatedArray = useMemo(() => [repeatedObj], [userReportObj]);

  const [rub, setRub] = useState(true);
  const [users, setUsers] = useState(true);
  const [del, setDel] = useState(true);
  const [ton, setTon] = useState(true);
  const [usdt, setUsdt] = useState(true);
  const {
    amountOfCreatedUsers,
    amountOfUsersWhoPayUsdt,
    amountOfUsersWhoPayDel,
    amountOfUsersWhoPayTon,
    amountOfUsersWhoPayRub,
  } = useSelector((state) => state.report.graphData);
  useEffect(() => {
    dispatch("REPORT_LOADING_WALLET");
    request(`${config.api}/report/wallet`)
      .then(walletTransform)
      .then((data) => dispatch(walletReport(data)))
      .catch(() => dispatch("REPORT_ERROR_WALLET"));
    dispatch("REPORT_LOADING_REFERRAL");
    request(`${config.api}/report/referral`)
      .then(walletTransform)
      .then((data) => dispatch(referralReport(data)))
      .catch(() => dispatch("REPORT_ERROR_REFERRAL"));
    dispatch("REPORT_LOADING_USER");
    request(`${config.api}/report/user`)
      .then((data) => dispatch(userReport(data)))
      .catch(() => dispatch("REPORT_ERROR_USER"));
  }, [dispatch, request]);
  const { firstTime, lastTime, group } = useSelector((state) => state.report);
  useEffect(() => {
    dispatch(graphLoading());
    request(
      `${config.api}/statistics?group=${group}`,
      { firstTime, lastTime },
      "POST"
    )
      .then((data) => dispatch(setGraphData(data)))
      .catch(() => dispatch(graphError()));
  }, [firstTime, lastTime, group]);
  return (
    <main className="report">
      <div className="report__head">
        <div className="report__wallet">
          <span className="icon button report__wallet-head">Кошелек</span>
          <Table
            headers={walletHeaders}
            body={walletArray}
            obj={walletReportObj}
            classNames={" report__table"}
          ></Table>
        </div>
        <div className="report__referral-award">
          <span className="icon button report__referral-award-head">
            Реферальное вознаграждение
          </span>
          <Table
            headers={referralHeaders}
            body={referralArray}
            obj={referralReportObj}
            classNames={" report__table"}
          ></Table>
        </div>
      </div>
      <div className="report__stat">
        <div className="icon button report__stat-head">Статистика подписок</div>
        <div className="wrapper">
          <div className="report__date">
            <div className="first__date">
              <label htmlFor="date">с</label>
              <input
                type="date"
                id="date"
                value={firstTime}
                onInput={(e) => dispatch(setFirstTime(e.target.value))}
              />
            </div>
            <div className="second__date">
              <label htmlFor="date">по</label>
              <input
                type="date"
                id="date"
                value={lastTime}
                onInput={(e) => dispatch(setSecondTime(e.target.value))}
              />
            </div>
            <select
              name="choice"
              id="choice"
              value={group}
              onInput={(e) => dispatch(setGroup(e.target.value))}
            >
              <option value="month">по месяцам</option>
              <option value="day">по дням</option>
              <option value="year">по годам</option>
            </select>
          </div>
          <div className="report__graph">
            <ul className="report__params">
              <li
                className="report__param"
                onClick={() => setUsers((users) => !users)}
              >
                <div className="box" id={users ? "user" : null}></div>
                <span>подписалось</span>
              </li>
              <li
                className="report__param"
                style={{}}
                onClick={() => setRub((rub) => !rub)}
              >
                <div className="box rub" id={rub ? "rub" : null}></div>
                <span>оплатили RUB</span>
              </li>
              <li
                className="report__param"
                style={{}}
                onClick={() => setDel((del) => !del)}
              >
                <div className="box del" id={del ? "del" : null}></div>
                <span>оплатили DEL</span>
              </li>
              <li
                className="report__param"
                style={{}}
                onClick={() => setTon((ton) => !ton)}
              >
                <div className="box" id={ton ? "ton" : null}></div>
                <span> оплатили TON</span>
              </li>
              <li
                className="report__param"
                style={{}}
                onClick={() => setUsdt((usdt) => !usdt)}
              >
                <div className="box usdt" id={usdt ? "usdt" : null}></div>
                <span> оплатили USDT</span>
              </li>
            </ul>
            <Graph
              amountOfCreatedUsers={users ? amountOfCreatedUsers : null}
              amountOfUsersWhoPayDel={del ? amountOfUsersWhoPayDel : null}
              amountOfUsersWhoPayRub={rub ? amountOfUsersWhoPayRub : null}
              amountOfUsersWhoPayUsdt={usdt ? amountOfUsersWhoPayUsdt : null}
              amountOfUsersWhoPayTon={ton ? amountOfUsersWhoPayTon : null}
            ></Graph>
          </div>
        </div>
        <div className="report__end">
          <div className="report__user-stat">
            <div className="icon button report__user-stat-head">
              Пользователи
            </div>
            <Table
              obj={userSection}
              body={userArray}
              headers={userHeaders}
              classNames={" report__table"}
            ></Table>
          </div>
          <div className="report__pay-stat">
            <div className="icon button report__user-stat-head">
              Повторный платеж
            </div>
            <Table
              obj={repeatedObj}
              headers={repeatedPayHeaders}
              body={repeatedArray}
              classNames={" report__table"}
            ></Table>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Report;
