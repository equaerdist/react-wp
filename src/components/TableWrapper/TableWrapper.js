export default function TableWrapper(
  Table,
  rows,
  columns,
  condition,
  sortOrder,
  sortParam,
  sortSet,
  onScroll,
  isSelected,
  onSelected
) {
  let result;
  if (condition === "idle" || condition === "loading") {
    let styles;
    if (condition === "loading")
      styles = { filter: "opacity(0.6)", transition: "all 0.2s" };
    result = (
      <Table
        columns={columns}
        rows={rows}
        sortOrder={sortOrder}
        sortParam={sortParam}
        setSort={sortSet}
        onScroll={onScroll}
        styles={styles}
        isSelected={isSelected}
        onSelected={onSelected}
      ></Table>
    );
  } else result = <h1>Ошибка...</h1>;
  return result;
}
