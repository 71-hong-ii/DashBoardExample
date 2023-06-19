import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import kendoka from './kendoka.svg';
import './App.scss';
import {Employees} from './pages/employees';
import Orders from './pages/orders';
import {Home} from './pages/home';
import {HomeLayout} from './components/homeLayout';
import {Floor} from "./pages/floor"
import {Concrete} from "./pages/concrete"

function App() {
  return (
    <div className="App">
        <HomeLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/floor" element={<Floor />} />
            <Route path="/concrete" element={<Concrete />} />
          </Routes>
        </HomeLayout>
    </div>
  );
}

export default App;
