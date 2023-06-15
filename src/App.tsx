import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import kendoka from "./kendoka.svg";
import "./App.scss";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import Gridmember from "./components/Gridmembers";
import { Home } from "./pages/home";
import { Orders } from "./pages/orders";
import { HomeLayout } from "./components/homeLayout";

function App() {
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
