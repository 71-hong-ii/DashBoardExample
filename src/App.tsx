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
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/employees" element={<Gridmember />} />
        <Route path="/home/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
