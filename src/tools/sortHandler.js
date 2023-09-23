const onSortSet = (
  property,
  sortParam,
  sortOrder,
  setSortParam,
  setSortOrder
) => {
  const isAsc = property === sortParam && sortOrder === "asc";
  setSortParam(property);
  setSortOrder(isAsc ? "desc" : "asc");
};
const setNewPage = (notes, condition, pageSize, setPage, page) => {
  if (notes.length % pageSize === 0 && condition === "idle") setPage(page + 1);
};
export { onSortSet, setNewPage };
