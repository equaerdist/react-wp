import "./Table.scss";
const Table = (props) => {
  if (props.obj == null) return <h1>Введите поля для таблицы</h1>;
  const headers = props.headers.map((header, i) => <th key={i}>{header}</th>);
  let body = props.body.map((item, i) => {
    const data = Object.keys(props.obj).map((header, j) => {
      let result = item[header];
      if (typeof result === "string") result = result.replace(/\n/g, "\n");

      return (
        <td key={j} style={{ whiteSpace: "pre-line" }}>
          {result}
        </td>
      );
    });
    return <tr key={i}>{data}</tr>;
  });
  return (
    <div className={"table__wrapper"}>
      <table className={"table" + (props.classNames ? props.classNames : "")}>
        <thead>
          <tr>{headers}</tr>
        </thead>

        <tbody>{body}</tbody>
      </table>
    </div>
  );
};
export default Table;
