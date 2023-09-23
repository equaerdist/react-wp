import "./Tab.scss";
import { useNavigate } from "react-router-dom";
import ListTab from "../ListTab/ListTab";
const Tab = (props) => {
  const navigate = useNavigate();
  return (
    <div className="Tab">
      <ListTab></ListTab>
      <button
        style={{ cursor: "pointer" }}
        className="Tab__exit"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Выйти
      </button>
    </div>
  );
};

export default Tab;
