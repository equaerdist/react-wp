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
  setWalletFirstTime,
  setWalletLastTime,
  setWalletOffset,
  setGraphOffset,
} from "../../actions/reportActions";
const Report = (props) => {
  const request = useHttp();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.global);
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
  const [trx, setTrx] = useState(true);
  const [bnb, setBnb] = useState(true);
  const graphData = useSelector((state) => state.report.graphData);
  const {
    amountOfCreatedUsers,
    amountOfUsersWhoPayBnb,
    amountOfUsersWhoPayDel,
    amountOfUsersWhoPayTon,
    amountOfUsersWhoPayRub,
    amountOfUsersWhoPayTrx,
  } = graphData;
  useEffect(() => {
    dispatch("REPORT_LOADING_REFERRAL");
    request(`${config.api}/report/referral`)
      .then(walletTransform)
      .then((data) => dispatch(referralReport(data)))
      .catch(() => dispatch("REPORT_ERROR_REFERRAL"));
    dispatch("REPORT_LOADING_USER");
    request(`${config.api}/report/user`)
      .then((data) => dispatch(userReport(data)))
      .catch(() => dispatch("REPORT_ERROR_USER"));
  }, [dispatch, request, project]);
  const {
    firstTime,
    lastTime,
    group,
    graphProcess,
    referralProcess,
    userProcess,
    walletOffset,
    graphOffset,
  } = useSelector((state) => state.report);
  useEffect(() => {
    dispatch(graphLoading());
    request(
      `${config.api}/statistics?group=${group}&offset=${graphOffset}`,
      { firstTime, lastTime },
      "POST"
    )
      .then((data) => dispatch(setGraphData(data)))
      .catch(() => dispatch(graphError()));
  }, [firstTime, lastTime, group, graphOffset, project]);

  const { walletFirstTime, walletLastTime, walletProcess } = useSelector(
    (state) => state.report
  );
  useEffect(() => {
    dispatch("REPORT_LOADING_WALLET");
    request(
      `${config.api}/report/wallet?offset=${walletOffset}`,
      {
        firstTime: walletFirstTime,
        lastTime: walletLastTime,
      },
      "POST"
    )
      .then(walletTransform)
      .then((data) => dispatch(walletReport(data)))
      .catch(() => dispatch("REPORT_ERROR_WALLET"));
  }, [walletFirstTime, walletLastTime, walletOffset, project]);
  return (
    <main className="report">
      <div className="report__head">
        <div className="report__wallet">
          <span className="icon button report__wallet-head">
            <span>Кошелек</span>
            <div className="first__date">
              <label className="labelDate" htmlFor="date">
                с
              </label>
              <input
                className="date"
                type="date"
                id="walletFirstDate"
                value={walletFirstTime}
                onInput={(e) => {
                  dispatch(setWalletFirstTime(e.target.value));
                  dispatch(setWalletOffset("interval"));
                }}
              />
            </div>
            <div className="second__date">
              <label className="labelDate" htmlFor="date">
                по
              </label>
              <input
                className="date"
                type="date"
                id="walletLastDate"
                value={walletLastTime}
                onInput={(e) => {
                  dispatch(setWalletLastTime(e.target.value));
                  dispatch(setWalletOffset("interval"));
                }}
              />
            </div>
            <button
              className="button time"
              onClick={() => dispatch(setWalletOffset("full"))}
            >
              За все время
            </button>
          </span>
          <Table
            process={walletProcess}
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
            process={referralProcess}
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
            <button
              className="button time clock_black"
              onClick={() => dispatch(setGraphOffset("full"))}
            >
              За все время
            </button>
            <div className="first__date">
              <label htmlFor="date">с</label>
              <input
                type="date"
                id="date"
                value={firstTime}
                onInput={(e) => {
                  dispatch(setFirstTime(e.target.value));
                  dispatch(setGraphOffset("interval"));
                }}
              />
            </div>
            <div className="second__date">
              <label htmlFor="date">по</label>
              <input
                type="date"
                id="date"
                value={lastTime}
                onInput={(e) => {
                  dispatch(setSecondTime(e.target.value));
                  dispatch(setGraphOffset("interval"));
                }}
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
                <div className="box ton" id={ton ? "ton" : null}></div>
                <span> оплатили TON</span>
              </li>
              <li
                className="report__param"
                style={{}}
                onClick={() => setBnb((bnb) => !bnb)}
              >
                <div className="box bnb" id={bnb ? "bnb" : null}></div>
                <span> оплатили BNB</span>
              </li>
              <li
                className="report__param"
                style={{}}
                onClick={() => setTrx((trx) => !trx)}
              >
                <div className="box trx" id={trx ? "trx" : null}></div>
                <span> оплатили TRX</span>
              </li>
            </ul>
            <Graph
              {...graphData}
              process={graphProcess}
              amountOfUsersWhoPayBnb={bnb ? amountOfUsersWhoPayBnb : null}
              amountOfCreatedUsers={users ? amountOfCreatedUsers : null}
              amountOfUsersWhoPayDel={del ? amountOfUsersWhoPayDel : null}
              amountOfUsersWhoPayRub={rub ? amountOfUsersWhoPayRub : null}
              amountOfUsersWhoPayTrx={trx ? amountOfUsersWhoPayTrx : null}
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
              process={userProcess}
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
              process={userProcess}
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
