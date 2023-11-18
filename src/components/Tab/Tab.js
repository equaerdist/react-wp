import "./Tab.scss";
import { useNavigate } from "react-router-dom";
import ListTab from "../ListTab/ListTab";
import { actions } from "../../slicers/global";
import { useSelector, useDispatch } from "react-redux";
const Tab = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.global);
  return (
    <div className="Tab">
      <select
        className="Tab__project"
        type="text"
        value={project}
        onChange={(e) => dispatch(actions(e.target.value))}
      >
        <option>god_eyes</option>
        <option>poleteli_vpn</option>
      </select>
      <ListTab project={project}></ListTab>
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
