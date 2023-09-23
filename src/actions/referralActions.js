import { referralTransform } from "../dataTransform/referralTransform";

const setReferrals = (payload) => ({ type: "REFERRAL_SET_REFERRALS", payload });
const setTerm = (payload) => ({ type: "REFERRAL_SET_TERM", payload });
const setPage = (payload) => ({ type: "REFERRAL_SET_PAGE", payload });
const setOrder = (payload) => ({ type: "REFERRAL_SET_SORT_ORDER", payload });
const setParam = (payload) => ({ type: "REFERRAL_SET_SORT_PARAM", payload });
const onNewParamsSet =
  (request, api, pageSize, term, sortOrder, sortParam) => (dispatch) => {
    dispatch(setPage(1));
    dispatch("REFERRAL_LOADING_REFERRALS");
    request(
      `${api}/user/referrals?page=${1}&pageSize=${pageSize}&searchTerm=${term}&sortParam=${sortParam}&sortOrder=${sortOrder}`
    )
      .then(referralTransform)
      .then((data) => dispatch(setReferrals(data)))
      .catch(() => dispatch("REFERRAL_ERROR_REFERRALS"));
  };
const onNewPage =
  (request, api, referrals, page, pageSize, term, sortParam, sortOrder) =>
  (dispatch) => {
    dispatch("REFERRAL_LOADING_REFERRALS");
    request(
      `${api}/user/referrals?page=${page}&pageSize=${pageSize}&searchTerm=${term}&sortParam=${sortParam}&sortOrder=${sortOrder}`
    )
      .then(referralTransform)
      .then((data) => dispatch(setReferrals([...referrals, ...data])))
      .catch(() => dispatch("REFERRAL_ERROR_REFERRALS"));
  };
export {
  setReferrals,
  setOrder,
  setTerm,
  setPage,
  setParam,
  onNewParamsSet,
  onNewPage,
};
