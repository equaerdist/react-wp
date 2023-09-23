import Search from "../Search/Search";
import ColumnGroupingTable from "../EndedTable/EndedTable";
import TableWrapper from "../TableWrapper/TableWrapper";
import "./Referral.scss";
import { useEffect, useRef } from "react";
import {
  setOrder,
  setPage,
  setParam,
  setTerm,
  onNewParamsSet,
  onNewPage,
} from "../../actions/referralActions";
import Stack from "../../tools/stack";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { createReferralColumns } from "../../dataTransform/referralTransform";
import useHttp from "../../hooks/useHttp";
import formatDate from "../../dataTransform/dateTransform";
const Referral = (props) => {
  const {
    page,
    pageSize,
    sortParam,
    sortOrder,
    term,
    referrals,
    referralsProcess,
  } = useSelector((state) => state.referral);
  const dispatch = useDispatch();
  const stack = useRef(new Stack());
  const label =
    referrals.length === 0 ? null : createReferralColumns(referrals[0]);
  const onClick = () => {
    if (!stack.current.isEmpty()) dispatch(setTerm(stack.current.pop()));
  };
  const onSelected = (item) => {
    stack.current.push(term);
    dispatch(setTerm(item.username));
  };
  const onSortSet = (property) => {
    const isAsc = property === sortParam && sortOrder === "asc";
    dispatch(setParam(property));
    dispatch(setOrder(isAsc ? "desc" : "asc"));
  };
  const request = useHttp();
  const setNewPage = () => {
    if (referrals.length % pageSize === 0 && referralsProcess === "idle") {
      dispatch(setPage(page + 1));
    }
  };
  useEffect(() => {
    dispatch(
      onNewParamsSet(request, config.api, pageSize, term, sortOrder, sortParam)
    );
  }, [sortParam, sortOrder, term, dispatch, request, pageSize]);
  useEffect(() => {
    if (page !== 1) {
      dispatch(
        onNewPage(
          request,
          config.api,
          referrals,
          page,
          pageSize,
          term,
          sortParam,
          sortOrder
        )
      );
    }
    // eslint-disable-next-line
  }, [page]);
  const rows = referrals.map((referral) => ({
    ...referral,
    createdAt: formatDate(referral.createdAt),
  }));
  return (
    <main className="referral">
      <button
        className="button icon referral__button"
        disabled={stack.current.isEmpty()}
        onClick={onClick}
      ></button>
      <div className="referral__body">
        <Search
          val={term}
          onInput={(value) => dispatch(setTerm(value))}
        ></Search>
        {TableWrapper(
          ColumnGroupingTable,
          rows,
          label,
          referralsProcess,
          sortOrder,
          sortParam,
          onSortSet,
          setNewPage,
          null,
          onSelected
        )}
      </div>
    </main>
  );
};
export default Referral;
