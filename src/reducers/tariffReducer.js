const initialState = {
  tariffs: [],
  promocodes: [],
  tariffsProcess: "idle",
  promocodesProcess: "idle",
  promocodePage: 1,
  tariffPage: 1,
  selectedTariff: null,
  selectedPromo: null,
};

const tariff = (state = initialState, action) => {
  switch (action.type) {
    case "TARIFF_SET_TARIFFS":
      return { ...state, tariffs: action.payload, tariffsProcess: "idle" };
    case "TARIFF_SET_PROMOCODES":
      return {
        ...state,
        promocodes: action.payload,
        promocodesProcess: "idle",
      };
    case "TARIFF_SET_SELECTED_PROMO":
      return { ...state, selectedPromo: action.payload };
    case "TARIFF_LOADING_PROMOCODES":
      return { ...state, promocodesProcess: "loading" };
    case "TARIFF_ERROR_PROMOCODES":
      return { ...state, promocodesProcess: "error" };
    case "TARIFF_LOADING_TARIFFS":
      return { ...state, tariffsProcess: "loading" };
    case "TARIFF_ERROR_TARIFFS":
      return { ...state, tariffsProcess: "error" };
    case "TARIFF_SET_PROMO_PAGE":
      return { ...state, promocodePage: action.payload };
    case "TARIFF_SET_TARIFFS_PAGE":
      return { ...state, tariffPage: action.payload };
    case "TARIFF_SET_SELECTED_TARIFF":
      return { ...state, selectedTariff: action.payload };
    default:
      return state;
  }
};
export default tariff;
