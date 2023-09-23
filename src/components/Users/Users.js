import "./Users.scss";
import {
  setPage,
  onPaged,
  onInit,
  setSelected,
  onActiveRequest,
} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import TableWrapper from "../TableWrapper/TableWrapper";
import Search from "../Search/Search";
import config from "../../config";
import ColumnGroupingTable from "../EndedTable/EndedTable";
import { createUserColumns } from "../../dataTransform/userTransform";
import formatDate from "../../dataTransform/dateTransform";
import ExportUsers from "../ExportUsers/ExportUsers";
import TestUserSub from "../TestUserSub/TestUserSub";
const Users = (props) => {
  const [sortParam, setSortParam] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const page = useSelector((state) => state.user.page);
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(16);

  const [exportState, setExportState] = useState(false);
  const [testState, setTestState] = useState(false);

  const condition = useSelector((state) => state.user.userProcess);
  const request = useHttp();
  const dispatch = useDispatch();
  const onSortSet = (property) => {
    const isAsc = property === sortParam && sortOrder === "asc";
    setSortParam(property);
    setSortOrder(isAsc ? "desc" : "asc");
  };
  const setNewPage = () => {
    if (users.length % pageSize === 0 && condition === "idle")
      dispatch(setPage(page + 1));
  };

  const selected = useSelector((state) => state.user.selectedUsers);

  const isSelected = (item) => {
    let result = false;
    selected.forEach((e) => {
      if (e.id === item.id) result = true;
    });
    return result;
  };
  const onSelected = (item) => {
    if (item.status === 1) return;
    if (isSelected(item))
      dispatch(setSelected(selected.filter((e) => e.id !== item.id)));
    else dispatch(setSelected([...selected, item]));
  };
  const users = useSelector((state) => state.user.users);
  const onInput = (value) => setSearchTerm(value);
  let labels = users.length === 0 ? null : createUserColumns(users[0]);
  useEffect(() => {
    let term = searchTerm;
    if (!term) term = "";
    if (page !== 1) {
      dispatch(
        onPaged(
          request,
          config.api,
          page,
          pageSize,
          sortParam,
          sortOrder,
          term,
          users
        )
      );
    }
    // eslint-disable-next-line
  }, [page]);
  const onHandleRequest = async (firstDate, secondDate) => {
    let blob = await request(
      `${config.api}/user/report`,
      {
        firstTime: new Date(firstDate).toISOString(),
        lastTime: new Date(secondDate).toISOString(),
      },
      "POST"
    );
    let data = await blob.blob();

    var blobUrl = URL.createObjectURL(data);

    var link = document.createElement("a");
    link.href = blobUrl;
    link.download = "file.xlsx";
    link.click();
    link.remove();

    URL.revokeObjectURL(blobUrl);
  };
  useEffect(() => {
    let term = searchTerm;
    if (!term) term = "";
    dispatch(onInit(request, config.api, sortParam, sortOrder, term, pageSize));
    // eslint-disable-next-line
  }, [sortParam, sortOrder, searchTerm, request, dispatch]);
  return (
    <main className="users">
      <ExportUsers
        open={exportState}
        setOpen={setExportState}
        handleRequest={onHandleRequest}
      ></ExportUsers>
      <TestUserSub
        open={testState}
        handleClose={() => setTestState(false)}
      ></TestUserSub>
      <div className="users__tools">
        <button
          className="button users__button export"
          onClick={() => setExportState(true)}
        >
          Экспорт пользователей
        </button>
        <button
          className="button users__button test-sub"
          onClick={() => setTestState(true)}
        >
          Выдать тестовую подписку
        </button>
      </div>
      <Search val={searchTerm} onInput={onInput}></Search>
      {TableWrapper(
        ColumnGroupingTable,
        users.map((user) => ({
          ...user,
          createdAt: formatDate(user.createdAt),
        })),
        labels,
        condition,
        sortOrder,
        sortParam,
        onSortSet,
        setNewPage,
        isSelected,
        onSelected
      )}
      {!(selected.length === 0) ? (
        <button
          className="button"
          onClick={() =>
            dispatch(onActiveRequest(request, config.api, selected, users))
          }
          disabled={condition === "loading" || selected.length === 0}
          style={{ paddingInline: "10px", marginTop: "25px", float: "right" }}
        >
          Сделать активными
        </button>
      ) : null}
    </main>
  );
};
export default Users;
