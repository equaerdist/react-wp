const initialState = {
  referrals: [],
  referralsProcess: "idle",
  term: "",
  page: 1,
  pageSize: 16,
  sortParam: "id",
  sortOrder: "asc",
};
const referral = (state = initialState, action) => {
  switch (action.type) {
    case "REFERRAL_SET_REFERRALS": {
      return { ...state, referrals: action.payload, referralsProcess: "idle" };
    }
    case "REFERRAL_SET_TERM":
      return { ...state, term: action.payload };
    case "REFERRAL_SET_PAGE":
      return { ...state, page: action.payload };
    case "REFERRAL_SET_SORT_PARAM":
      return { ...state, sortParam: action.payload };
    case "REFERRAL_SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "REFERRAL_ERROR_REFERRALS":
      return { ...state, referralsProcess: "error" };
    case "REFERRAL_LOADING_REFERRALS":
      return { ...state, referralsProcess: "loading" };
    default:
      return state;
  }
};
export default referral;
