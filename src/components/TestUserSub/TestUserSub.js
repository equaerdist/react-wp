import Box from "@mui/material/Box";
import TableWrapper from "../TableWrapper/TableWrapper";
import ColumnGroupingTable from "../EndedTable/EndedTable";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search/Search";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  setFreePage,
  onFreeInit,
  onFreeSort,
  setFreeSelected,
  applyFree,
} from "../../actions/userActions";
import { createUserColumns } from "../../dataTransform/userTransform";
import { onSortSet, setNewPage } from "../../tools/sortHandler";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import config from "../../config";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function TestUserSub(props) {
  const { open, handleClose } = props;
  const pageSize = 16;
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortParam, setSortParam] = useState("id");

  const [duration, setDuration] = useState(0);

  const { freeUsers, freeProcess, freeSelected, freePage } = useSelector(
    (state) => state.user
  );
  const isSelected = (item) => {
    let result = false;
    freeSelected.forEach((e) => {
      if (e.id === item.id) result = true;
    });
    return result;
  };
  const onSelected = (item) => {
    if (isSelected(item))
      dispatch(setFreeSelected(freeSelected.filter((e) => e.id !== item.id)));
    else dispatch(setFreeSelected([...freeSelected, item]));
  };
  const onFreeRequest = () => {
    dispatch(applyFree(request, config.api, freeSelected, duration, freeUsers));
  };
  const onSort = (property) =>
    onSortSet(property, sortParam, sortOrder, setSortParam, setSortOrder);
  const request = useHttp();
  const notes = freeUsers.map((item) => {
    let temp = item;
    delete temp.createdAt;
    delete temp.isFree;
    return temp;
  });
  const labels = freeUsers.length === 0 ? null : createUserColumns(notes[0]);
  const onNewPage = () =>
    setNewPage(
      freeUsers,
      freeProcess,
      pageSize,
      (value) => dispatch(setFreePage(value)),
      freePage
    );
  useEffect(() => {
    if (freePage !== 1) {
      dispatch(
        onFreeInit(
          request,
          config.api,
          freePage,
          pageSize,
          sortParam,
          sortOrder,
          "",
          freeUsers
        )
      );
    }
    // eslint-disable-next-line
  }, [freePage, request, dispatch]);
  useEffect(() => {
    dispatch(setFreePage(1));
    dispatch(
      onFreeSort(
        request,
        config.api,

        sortParam,
        pageSize,
        sortOrder
      )
    );
  }, [sortParam, sortOrder, request, dispatch]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: "50%" }}>
        {TableWrapper(
          ColumnGroupingTable,
          freeUsers,
          labels,
          freeProcess,
          sortOrder,
          sortParam,
          onSort,
          onNewPage,
          isSelected,
          onSelected
        )}
        {freeProcess === "error" ? (
          <Alert severity="error">
            <AlertTitle>Ошибка</AlertTitle>
            Произошла ошибка при выдаче подписок —
            <strong>попробуйте снова!</strong>
          </Alert>
        ) : null}
        <Search
          isHidden={freeSelected.length === 0}
          val={duration}
          onInput={(value) => setDuration(parseInt(value))}
          label={"Длительность"}
        ></Search>
        <button
          onClick={onFreeRequest}
          disabled={duration === 0 || freeProcess === "loading"}
          style={{
            margin: 0,
            paddingInline: "15px",
            marginTop: "15px",
            float: "right",
          }}
          className="button"
        >
          Выдать подписку
        </button>
      </Box>
    </Modal>
  );
}
