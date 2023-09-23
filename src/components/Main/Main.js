import UserProfile from "../UserProfile/UserProfile";
import Tab from "../Tab/Tab";
import Users from "../Users/Users";
import Report from "../Report/Report";
import Cash from "../Cash/Cash";
import Referral from "../Referral/Referral";
import Tarif from "../Tarif/Tarif";
import Settings from "../Settings/Settings";
import { Routes, Route, useNavigate } from "react-router-dom";
import config from "../../config";
import useHttp from "../../hooks/useHttp";
import { useEffect } from "react";
const Main = (props) => {
  const navigate = useNavigate();
  const request = useHttp();
  useEffect(() => {
    request(`${config.api}/auth`, null, "GET").catch((error) => navigate("/"));
  }, []);
  return (
    <div className="App">
      <Tab></Tab>
      <UserProfile></UserProfile>
      <Routes>
        <Route index path="cash" element={<Cash></Cash>}></Route>
        <Route path="users" element={<Users></Users>}></Route>
        <Route path="report" element={<Report></Report>}></Route>
        <Route path="referral" element={<Referral></Referral>}></Route>
        <Route path="tarif" element={<Tarif></Tarif>}></Route>
        <Route path="settings" element={<Settings></Settings>}></Route>
      </Routes>
    </div>
  );
};
export default Main;
