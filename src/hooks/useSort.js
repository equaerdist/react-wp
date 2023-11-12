import { useState } from "react";

const useSort = () => {
  const [sortParam, setSortParam] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const onSortSet = (property) => {
    const isAsc = property === sortParam && sortOrder === "asc";
    setSortParam(property);
    setSortOrder(isAsc ? "desc" : "asc");
    setPage(1);
  };
  return {
    onSortSet,
    page,
    pageSize,
    sortParam,
    sortOrder,
    setPage,
    setPageSize,
  };
};
export default useSort;
