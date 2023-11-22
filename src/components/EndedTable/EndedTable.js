import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

export default function ColumnGroupingTable(props) {
  let columns = props.columns;
  const rows = props.rows;
  let elem = React.useRef(null);
  const {
    sortOrder,
    sortParam,
    setSort,
    onScroll,
    styles,
    isSelected,
    onSelected,
  } = props;

  if (!columns) return <h1>Нет информации для отображения</h1>;
  columns = columns.filter((column) => column);
  if (columns.length === 0) return <h1>Нет информации для отображения</h1>;
  const onPage = (e) => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      if (onScroll) onScroll();
    }
  };
  return (
    <Paper
      sx={{
        width: "100%",
        marginTop: "10px",
        height: "600px",
        overflowY: "auto",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          ...styles,
        }}
        onScroll={onPage}
        ref={elem}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          style={{ overflowX: "hidden" }}
        >
          <TableHead>
            <TableRow role="checkbox">
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{
                      top: 0,
                      minWidth: 0,
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    <TableSortLabel
                      active={sortParam === column.sort}
                      direction={sortOrder === "asc" ? "desc" : "asc"}
                      onClick={() => {
                        if (setSort) setSort(column.sort);
                      }}
                    >
                      {column.label}
                      {sortParam === column.sort ? (
                        <Box component="span" sx={visuallyHidden}>
                          {sortOrder === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  selected={isSelected ? isSelected(row) : false}
                  onClick={() => {
                    if (onSelected) onSelected(row);
                  }}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  <>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {value}
                        </TableCell>
                      );
                    })}
                  </>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
