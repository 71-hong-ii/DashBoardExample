import React from 'react';
import { TileLayout, TileLayoutItem } from '@progress/kendo-react-layout';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

const Orders = () => {

  const dataTiles = [
    {
      defaultPosition: {
        col: 1,
        colSpan: 1,
        rowSpan: 1,
      },
      header: "PieChart here",
      body: <PieChart />,
    },
    {
      defaultPosition: {
        col: 2,
        colSpan: 1,
        rowSpan: 1,
      },
      header: "BarChart here",
      body: <BarChart />,
    },
  ];

  return (
    <div>
      <TileLayout columns={1} items={dataTiles}></TileLayout>
    </div>
  );
};

export default Orders;
