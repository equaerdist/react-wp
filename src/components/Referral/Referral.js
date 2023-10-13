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
  setLastTerm,
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
    prevTerm,
  } = useSelector((state) => state.referral);
  const dispatch = useDispatch();
  const stack = useRef(new Stack());
  const { project } = useSelector((state) => state.global);
  const label =
    referrals.length === 0
      ? null
      : createReferralColumns(referrals[0], project);
  const onClick = () => {
    if (!stack.current.isEmpty()) {
      dispatch(setLastTerm(term));
      dispatch(setTerm(stack.current.pop()));
    } else {
      if (term && term !== "") {
        dispatch("REFERRAL_LOADING_REFERRALS");
        request(`${config.api}/user/referrals/father?term=${term}`)
          .then((data) => {
            dispatch(setLastTerm(term));
            dispatch(setTerm(data.term));
          })
          .catch(() => dispatch("REFERRAL_ERROR_REFERRALS"));
      }
    }
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
  const isSelected = (item) => {
    let result = false;
    if (
      item?.username === prevTerm ||
      (item?.firstName === prevTerm && prevTerm !== "")
    )
      result = true;
    return result;
  };
  useEffect(() => {
    dispatch(
      onNewParamsSet(request, config.api, pageSize, term, sortOrder, sortParam)
    );
  }, [sortParam, sortOrder, term, dispatch, request, pageSize, project]);
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
      <div className="wrapper">
        <button
          className="button icon referral__button"
          onClick={onClick}
        ></button>
        <button
          className="button back"
          onClick={() => {
            dispatch(setTerm(""));
            dispatch(setLastTerm(""));
          }}
        >
          Вернуться
        </button>
      </div>

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
          isSelected,
          onSelected
        )}
      </div>
    </main>
  );
};
export default Referral;
