import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Employees } from "./pages/employees";
import Orders from "./pages/orders";
import { Home } from "./pages/home";
import { HomeLayout } from "./components/homeLayout";
import { Floor } from "./pages/floor";
import { Building } from "./pages/building";
import { FloorHeight } from "./pages/floor_height";

function App() {
  return (
    <div className="App">
      <HomeLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/floor" element={<Floor />} />
          <Route path="/building" element={<Building />} />
          <Route path="/floor_height" element={<FloorHeight />} />
        </Routes>
      </HomeLayout>
    </div>
  );
}

export default App;
