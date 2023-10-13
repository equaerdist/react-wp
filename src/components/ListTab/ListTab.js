import "./ListTab.scss";
import { NavLink } from "react-router-dom";
const ListTab = (props) => {
  return (
    <ul className="list__tab">
      <NavLink
        to="/main/report"
        className={({ isActive, isPending }) =>
          isActive
            ? "list__tab-button list__tab-button_active"
            : "list__tab-button"
        }
      >
        Отчеты
      </NavLink>
      <NavLink
        to="/main/cash"
        className={({ isActive, isPending }) =>
          isActive
            ? "list__tab-button a list__tab-button_active"
            : "list__tab-button a"
        }
      >
        Выплаты
      </NavLink>
      <NavLink
        to="/main/users"
        className={({ isActive, isPending }) =>
          isActive
            ? "list__tab-button b list__tab-button_active"
            : " list__tab-button b"
        }
      >
        Пользователи
      </NavLink>
      <NavLink
        to="/main/referral"
        className={({ isActive, isPending }) =>
          isActive
            ? "list__tab-button list__tab-button_active c"
            : "list__tab-button c"
        }
      >
        Рефералы
      </NavLink>
      {props.project && !props.project.includes("god") ? (
        <NavLink
          to="/main/tarif"
          className={({ isActive, isPending }) =>
            isActive
              ? "list__tab-button list__tab-button_active d"
              : "list__tab-button d"
          }
        >
          Тарифы
        </NavLink>
      ) : null}
      <NavLink
        to="/main/settings"
        className={({ isActive, isPending }) =>
          isActive
            ? "list__tab-button list__tab-button_active e"
            : "list__tab-button e"
        }
      >
        Настройки
      </NavLink>
    </ul>
  );
};
export default ListTab;
