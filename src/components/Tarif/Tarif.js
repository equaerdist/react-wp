import ColumnGroupingTable from "../EndedTable/EndedTable";
import TableWrapper from "../TableWrapper/TableWrapper";
import Search from "../Search/Search";
import "./Tarif.scss";
import { useEffect, useState } from "react";
import PromocodeCreator from "../PromocodeCreator/PromocodeCreator";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import {
  createPromocodeColumns,
  createTariffColumns,
} from "../../dataTransform/tariffTransform";
import formatDate from "../../dataTransform/dateTransform";
import { onSortSet, setNewPage } from "../../tools/sortHandler";
import useHttp from "../../hooks/useHttp";
import {
  onPaged,
  onPromoPaged,
  promoInit,
  tariffInit,
  setTariffPage,
  setPromocodePage,
  setSelectedTariff,
  setTariffs,
  setPromocodes,
  setSelectedPromo,
  onPromoRequestDelete,
} from "../../actions/tariffActions";
import TableCreator from "../TariffCreator/TariffCreator";
const Tarif = (props) => {
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(16);

  const [tariffSortParam, setTariffSortParam] = useState("id");
  const [promocodeSortParam, setPromocodeSortParam] = useState("id");

  const [tariffSortOrder, setTariffSortOrder] = useState("asc");
  const [promocodeSortOrder, setPromocodeSortOrder] = useState("asc");

  const [tariffCreator, setTariffCreator] = useState(false);
  const [promoCreator, setPromoCreator] = useState(false);
  const [tariffTerm, setTariffTerm] = useState("");
  const [promocodeTerm, setPromocodeTerm] = useState("");

  const dispatch = useDispatch();
  const request = useHttp();
  const {
    promocodePage,
    tariffs,
    promocodes,
    tariffsProcess,
    promocodesProcess,
    tariffPage,
    selectedTariff,
    selectedPromo,
  } = useSelector((state) => state.tariff);

  const promoLabels =
    promocodes.length === 0 ? null : createPromocodeColumns(promocodes[0]);
  const tariffLabels =
    tariffs.length === 0 ? null : createTariffColumns(tariffs[0]);

  const tariffRows = tariffs.map((tariff) => ({
    ...tariff,
    createdAt: formatDate(tariff.createdAt),
  }));
  const promoRows = promocodes.map((promo) => ({ ...promo.tariff, ...promo }));
  const onTariffSelect = (item) => {
    dispatch(setSelectedTariff(item));
  };
  const isTariffSelected = (item) => {
    return item.id === selectedTariff?.id;
  };

  const onPromoUpdate = (promo) => {
    dispatch(setPromocodes([promo, ...promocodes]));
  };

  const onTariffButtonClick = (id) => {
    dispatch(setTariffs(tariffs.filter((item) => item.id !== id)));
  };
  useEffect(() => {
    if (selectedTariff) setTariffCreator(true);
  }, [selectedTariff]);
  const onUpdateClick = (id, values) => {
    dispatch(
      setTariffs(
        tariffs.map((tarif) => {
          if (tarif.id === id) return { id, ...tarif, ...values };
          return tarif;
        })
      )
    );
  };
  const onAddClick = (tariff) => {
    dispatch(setTariffs([tariff, ...tariffs]));
  };

  const isPromoSelected = (item) => {
    return selectedPromo?.id === item.id;
  };

  const onPromoSelect = (item) => {
    if (isPromoSelected(item)) dispatch(setSelectedPromo(null));
    else dispatch(setSelectedPromo(item));
  };

  const onSortTariffSet = (property) => {
    onSortSet(
      property,
      tariffSortParam,
      tariffSortOrder,
      setTariffSortParam,
      setTariffSortOrder
    );
  };
  const onSortPromoSet = (property) => {
    onSortSet(
      property,
      promocodeSortParam,
      promocodeSortOrder,
      setPromocodeSortParam,
      setPromocodeSortOrder
    );
  };
  const onSetNewTariffPage = () =>
    setNewPage(
      tariffs,
      tariffsProcess,
      pageSize,
      (value) => dispatch(setTariffPage(value)),
      tariffPage
    );

  const onSetNewPromoPage = () =>
    setNewPage(
      promocodes,
      promocodesProcess,
      pageSize,
      (value) => dispatch(setPromocodePage(value)),
      promocodePage
    );

  useEffect(() => {
    if (tariffPage !== 1) {
      dispatch(
        onPaged(
          request,
          config.api,
          tariffs,
          tariffPage,
          pageSize,
          tariffSortParam,
          tariffSortOrder,
          tariffTerm
        )
      );
    }
    // eslint-disable-next-line
  }, [tariffPage, request, dispatch]);
  useEffect(() => {
    if (promocodePage !== 1) {
      dispatch(
        onPromoPaged(
          request,
          config.api,
          promocodes,
          promocodePage,
          promocodeSortParam,
          promocodeSortOrder,
          pageSize,
          promocodeTerm
        )
      );
    }
    // eslint-disable-next-line
  }, [promocodePage, request, dispatch]);

  useEffect(() => {
    dispatch(
      tariffInit(
        request,
        config.api,
        tariffSortParam,
        tariffSortOrder,
        tariffTerm,
        pageSize
      )
    );
    // eslint-disable-next-line
  }, [tariffSortOrder, tariffSortParam, tariffTerm, dispatch, request]);
  useEffect(() => {
    dispatch(
      promoInit(
        request,
        config.api,
        promocodeSortParam,
        promocodeSortOrder,
        promocodeTerm,
        pageSize
      )
    );
    // eslint-disable-next-line
  }, [
    promocodeSortOrder,
    promocodeSortParam,
    promocodeTerm,
    dispatch,
    request,
  ]);
  return (
    <main className="tarif">
      <PromocodeCreator
        handleClose={() => setPromoCreator(false)}
        open={promoCreator}
        updatePromo={onPromoUpdate}
        tariffs={tariffs}
      ></PromocodeCreator>
      <TableCreator
        updateTariff={onUpdateClick}
        setTariffs={onTariffButtonClick}
        addTariff={onAddClick}
        tariff={selectedTariff}
        open={tariffCreator}
        handleClose={() => {
          setTariffCreator(false);
          dispatch(setSelectedTariff(null));
        }}
      ></TableCreator>
      <div className="tarif__tools">
        <button
          className="button icon tarif__add"
          onClick={() => setTariffCreator(true)}
        >
          Добавить тариф
        </button>
        <button
          className="button icon tarif__promo"
          onClick={() => setPromoCreator(true)}
        >
          Создать промокод
        </button>
      </div>
      <div className="tarif__tables">
        <div className="tarif__first">
          <div className="button icon tarif__first-head">Тарифы</div>
          <div className="tarif__first-body">
            <Search
              val={tariffTerm}
              onInput={(value) => {
                setTariffTerm(value);
                dispatch(setTariffPage(1));
              }}
            ></Search>
            {TableWrapper(
              ColumnGroupingTable,
              tariffRows,
              tariffLabels,
              tariffsProcess,
              tariffSortOrder,
              tariffSortParam,
              onSortTariffSet,
              onSetNewTariffPage,
              isTariffSelected,
              onTariffSelect
            )}
          </div>
        </div>
        <div className="tarif__second">
          <div className="button icon tarif__second-head">Промокоды</div>
          <div className="tarif__second-body">
            <Search
              val={promocodeTerm}
              onInput={(value) => {
                setPromocodeTerm(value);
                dispatch(setPromocodePage(1));
              }}
            ></Search>
            {TableWrapper(
              ColumnGroupingTable,
              promoRows,
              promoLabels,
              promocodesProcess,
              promocodeSortOrder,
              promocodeSortParam,
              onSortPromoSet,
              onSetNewPromoPage,
              isPromoSelected,
              onPromoSelect
            )}
            {selectedPromo ? (
              <button
                className="button"
                onClick={() => {
                  dispatch(
                    onPromoRequestDelete(
                      selectedPromo,
                      request,
                      config.api,
                      promocodes
                    )
                  );
                  dispatch(setSelectedPromo(null));
                }}
                style={{
                  marginLeft: 0,
                  float: "right",
                  marginTop: "15px",
                  paddingInline: "10px",
                }}
              >
                Удалить тариф
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Tarif;
