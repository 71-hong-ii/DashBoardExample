import React from "react";
import { Routes, Route } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import kendoka from "./kendoka.svg";
import "./App.scss";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import PieChart from "./components/PieChart";
import Gridmember from "./components/Gridmembers";
import { Home } from "./pages/home";
import {Orders} from "./pages/orders"

function App() {
  const [contextState, setContextState] = React.useState({
    localeId: "en-US",
    firstName: "Peter",
    lastName: "Douglas",
    middleName: "",
    email: "peter.douglas@progress.com",
    phoneNumber: "(+1) 8373-837-93-02",
    avatar: null,
    isInPublicDirectory: true,
    biography: "",
    teamId: 1,
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Gridmember />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
