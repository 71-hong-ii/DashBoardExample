import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartTitle, ChartLegend, ChartTooltip } from '@progress/kendo-react-charts';
import { TooltipContext, SharedTooltipContext } from '@progress/kendo-react-charts';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Orders = () => {
  const [layout, setLayout] = useState([
    { i: 'pie', x: 0, y: 0, w: 6, h: 6 },
    { i: 'bar', x: 6, y: 0, w: 6, h: 6 },
  ]);

  const onLayoutChange = (newLayout: any[]) => {
    setLayout(newLayout);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      rowHeight={100}
      onLayoutChange={onLayoutChange}
    >
      <div key="pie">
        <PieChart />
      </div>
      <div key="bar">
        <BarChart />
      </div>
    </ResponsiveGridLayout>
  );
};

export default Orders;
