import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import useHttp from "../../hooks/useHttp";
import config from "../../config";
import ColumnGroupingTable from "../EndedTable/EndedTable";
import {
  selectRequest,
  removeSelect,
  requestClick,
} from "../../actions/cashActions";
import {
  givenPaged,
  inputGiven,
  inputRequest,
  requestPaged,
  requestSetPage,
  givenSetPage,
} from "../../actions/cashActions";
import TableWrapper from "../TableWrapper/TableWrapper";
import { createColumnsForCashGiven } from "../../dataTransform/cashTransform";
import "./Cash.scss";
import { initCashGiven, initCashRequest } from "../../actions/cashActions";
const Cash = (props) => {
  const project = useSelector((state) => state.global.project);
  const [sortGivenParam, setGivenSortParam] = useState("id");
  const [sortGivenOrder, setGivenSortOrder] = useState("asc");

  const [sortRequestParam, setRequestSortParam] = useState("id");
  const [sortRequestOrder, setRequestSortOrder] = useState("asc");
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(15);

  const dispatch = useDispatch();
  const request = useHttp();

  const givenNotes = useSelector((state) => state.cash.given);
  const requestNotes = useSelector((state) => state.cash.requests);

  const givenTerm = useSelector((state) => state.cash.givenTerm);
  const requestTerm = useSelector((state) => state.cash.requestTerm);

  const givenCondition = useSelector((state) => state.cash.givenProcess);
  const requestCondition = useSelector((state) => state.cash.requestProcess);
  const givenPageNumber = useSelector((state) => state.cash.givenPage);
  const requestPageNumber = useSelector((state) => state.cash.requestPage);
  const onGivenSortSet = (property) => {
    const isAsc = property === sortGivenParam && sortGivenOrder === "asc";
    setGivenSortParam(property);
    setGivenSortOrder(isAsc ? "desc" : "asc");
    dispatch(givenSetPage(1));
  };

  const onRequestClick = () => {
    dispatch(requestClick(config.api, request, requestNotes, selected));
  };
  const onRequestSort = (property) => {
    const isAsc = property === sortRequestParam && sortRequestOrder === "asc";
    setRequestSortParam(property);
    setRequestSortOrder(isAsc ? "desc" : "asc");
    dispatch(requestSetPage(1));
  };
  const setNewRequestPage = () => {
    if (
      requestNotes.length % pageSize === 0 &&
      requestCondition === "idle" &&
      requestNotes.length === pageSize * requestPageNumber
    )
      dispatch(requestSetPage(requestPageNumber + 1));
  };
  const setNewGivenPage = () => {
    if (
      givenNotes.length % pageSize === 0 &&
      givenCondition === "idle" &&
      givenNotes.length === pageSize * givenPageNumber
    )
      dispatch(givenSetPage(givenPageNumber + 1));
  };

  const selected = useSelector((state) => state.cash.selectedRequests);
  const isSelected = (item) => {
    let result = false;
    selected.forEach((e) => {
      if (e.id === item.id) result = true;
    });
    return result;
  };
  const onSelected = (item) => {
    if (isSelected(item)) dispatch(removeSelect(item));
    else dispatch(selectRequest(item));
  };
  const onRequestInput = (value) => {
    dispatch(inputRequest(value));
    dispatch(requestSetPage(1));
  };
  const onGivenInput = (value) => {
    dispatch(inputGiven(value));
    dispatch(givenSetPage(1));
  };
  useEffect(() => {
    if (givenPageNumber !== 1)
      dispatch(
        givenPaged(
          config.api,
          request,
          givenPageNumber,
          pageSize,
          sortGivenParam,
          sortGivenOrder,
          givenNotes,
          givenTerm
        )
      );
    // eslint-disable-next-line
  }, [givenPageNumber]);
  useEffect(() => {
    if (requestPageNumber !== 1)
      dispatch(
        requestPaged(
          config.api,
          request,
          requestPageNumber,
          pageSize,
          sortRequestParam,
          sortRequestOrder,
          requestNotes,
          requestTerm
        )
      );
    // eslint-disable-next-line
  }, [requestPageNumber]);
  useEffect(() => {
    dispatch(
      initCashGiven(
        request,
        config.api,
        pageSize,
        sortGivenParam,
        sortGivenOrder,
        givenTerm
      )
    );
    dispatch(givenSetPage(1));
    // eslint-disable-next-line
  }, [sortGivenParam, sortGivenOrder, givenTerm, project]);
  useEffect(() => {
    dispatch("CASH_RESET_SELECTED");
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      initCashRequest(
        pageSize,
        request,
        config.api,
        sortRequestOrder,
        sortRequestParam,
        requestTerm
      )
    );
    dispatch(requestSetPage(1));
    // eslint-disable-next-line
  }, [sortRequestOrder, sortRequestParam, requestTerm, project]);
  let requestLabels =
    requestNotes.length === 0
      ? null
      : createColumnsForCashGiven(requestNotes[0]);
  let givenLabels =
    givenNotes.length === 0 ? null : createColumnsForCashGiven(givenNotes[0]);
  return (
    <div className="cash">
      <button
        className="icon button cash__button"
        onClick={onRequestClick}
        disabled={requestCondition === "loading"}
      >
        Подтвердить заявку
      </button>
      <main className="cash__tables">
        <div className="cash__withdrawal">
          <div className="icon button cash__withdrawal-head">Выплачено</div>
          <div className="cash__withdrawal-body">
            <Search val={givenTerm} onInput={onGivenInput}></Search>
            {TableWrapper(
              ColumnGroupingTable,
              givenNotes,
              givenLabels,
              givenCondition,
              sortGivenOrder,
              sortGivenParam,
              onGivenSortSet,
              setNewGivenPage
            )}
          </div>
        </div>
        <div className="cash__request">
          <div className="icon button cash__request-head">Заявки на вывод</div>
          <div className="cash__request-body">
            <Search val={requestTerm} onInput={onRequestInput}></Search>
            {TableWrapper(
              ColumnGroupingTable,
              requestNotes,
              requestLabels,
              requestCondition,
              sortRequestOrder,
              sortRequestParam,
              onRequestSort,
              setNewRequestPage,
              isSelected,
              onSelected
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cash;
