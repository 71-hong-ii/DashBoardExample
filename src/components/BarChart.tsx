import React from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartTitle, ChartLegend, ChartTooltip } from '@progress/kendo-react-charts';
import { TooltipContext, SharedTooltipContext } from '@progress/kendo-react-charts';
import "./BarChart.scss";

interface OrderData {
  teamID: string;
}

interface Props {
  teamOrders: { [key: string]: number };
}

const BarChart: React.FC<Props> = ({ teamOrders }) => {
  const categories = Object.keys(teamOrders).map((teamID) => `Team ${teamID}`);
  const data = Object.entries(teamOrders).map(([teamID, count]) => ({
    category: `Team ${teamID}`,
    value: count,
  }));

  const OrderTooltip = (props: TooltipContext | SharedTooltipContext): React.ReactNode => {
    const point = 'point' in props ? props.point : undefined;
    if (!point) {
      return null;
    }

    const totalOrders = Object.values(teamOrders).reduce((a, b) => a + b, 0);
    const orderPercentage = ((point.value / totalOrders) * 100).toFixed(2);

    return (
      <div>
        <h3>{String(point.category)}</h3>
        <p>Order Percentage: {orderPercentage}%</p>
        <p>Total Orders: {String(point.value)}</p>
      </div>
    );
  };

  return (
    <Chart>
      <ChartTitle text="Team Order Distribution" />
      <ChartLegend position="top" orientation="horizontal" />
      <ChartTooltip render={OrderTooltip} />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={categories} />
      </ChartCategoryAxis>
      <ChartSeries>
        <ChartSeriesItem
          type="column"
          data={data}
          field="value"
          categoryField="category"
        />
      </ChartSeries>
    </Chart>
  );
};

export default BarChart;
