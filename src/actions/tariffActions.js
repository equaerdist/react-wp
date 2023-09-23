import { promoTransform } from "../dataTransform/tariffTransform";

const setTariffs = (payload) => ({ type: "TARIFF_SET_TARIFFS", payload });
const setPromocodes = (payload) => ({ type: "TARIFF_SET_PROMOCODES", payload });
const setSelectedTariff = (payload) => ({
  type: "TARIFF_SET_SELECTED_TARIFF",
  payload,
});

const setSelectedPromo = (payload) => ({
  type: "TARIFF_SET_SELECTED_PROMO",
  payload,
});
const onPaged =
  (request, api, old, page, pageSize, sortParam, sortOrder, searchTerm) =>
  (dispatch) => {
    dispatch("TARIFF_LOADING_TARIFFS");
    request(
      `${api}/tarif?page=${page}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${searchTerm}`
    )
      .then((data) => dispatch(setTariffs([...old, ...data])))
      .catch(() => dispatch("TARIFF_ERROR_TARIFFS"));
  };
const onPromoPaged =
  (request, api, old, page, sortParam, sortOrder, pageSize, term) =>
  (dispatch) => {
    dispatch("TARIFF_LOADING_PROMOCODES");
    request(
      `${api}/tarif/promocodes?page=${page}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${term}`
    )
      .then(promoTransform)
      .then((data) => dispatch(setPromocodes([...old, ...data])))
      .catch(() => dispatch("TARIFF_ERROR_PROMOCODES"));
  };

const setTariffPage = (payload) => ({
  type: "TARIFF_SET_TARIFFS_PAGE",
  payload,
});

const setPromocodePage = (payload) => ({
  type: "TARIFF_SET_PROMO_PAGE",
  payload,
});

const onPromoRequestDelete = (selected, request, api, old) => (dispatch) => {
  dispatch("TARIFF_LOADING_PROMOCODES");
  request(`${api}/tarif/promocodes/${selected.id}`, null, "DELETE")
    .then(() =>
      dispatch(setPromocodes(old.filter((e) => e.id !== selected.id)))
    )
    .catch(() => dispatch("TARIFF_ERROR_PROMOCODES"));
};
const promoInit =
  (request, api, sortParam, sortOrder, term, pageSize) => (dispatch) => {
    dispatch("TARIFF_LOADING_PROMOCODES");
    dispatch(setPromocodePage(1));
    request(
      `${api}/tarif/promocodes?page=${1}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${term}`
    )
      .then(promoTransform)
      .then((data) => dispatch(setPromocodes(data)))
      .catch(() => dispatch("TARIFF_ERROR_PROMOCODES"));
  };

const tariffInit =
  (request, api, sortParam, sortOrder, term, pageSize) => (dispatch) => {
    dispatch("TARIFF_LOADING_TARIFFS");
    dispatch(setTariffPage(1));
    request(
      `${api}/tarif?page=${1}&pageSize=${pageSize}&sortParam=${sortParam}&sortOrder=${sortOrder}&searchTerm=${term}`
    )
      .then((data) => dispatch(setTariffs(data)))
      .catch(() => dispatch("TARIFF_ERROR_TARIFFS"));
  };
export {
  setTariffs,
  setPromocodes,
  onPaged,
  onPromoPaged,
  promoInit,
  tariffInit,
  setTariffPage,
  setPromocodePage,
  setSelectedTariff,
  setSelectedPromo,
  onPromoRequestDelete,
};
