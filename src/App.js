import "./App.css";
import Main from "./components/Main/Main";
import Authorize from "./components/Authorize/Authorize";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/main/*" element={<Main></Main>}></Route>
      <Route index path="/" element={<Authorize></Authorize>}></Route>
    </Routes>
  );
}

export default App;
