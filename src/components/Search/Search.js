import { useRef } from "react";
import "./Search.scss";
const Search = (props) => {
  const value = useRef(1);
  const { onInput, val, isHidden } = props;
  const onInsert = (e) => {
    if (value.current === 1) {
      onInput(e.target.value);
      value.current = 0;
      setTimeout(() => (value.current = 1), 90);
    }
  };
  return (
    <div
      className="search"
      style={{ visibility: isHidden ? "hidden" : "visible" }}
    >
      <label htmlFor="search__input" className="search__label">
        {props.label ? props.label : "Найти"}
      </label>
      <input
        type="text"
        className="search__input"
        id="search__input"
        onInput={onInsert}
        value={val ? val : ""}
      />
    </div>
  );
};
export default Search;
