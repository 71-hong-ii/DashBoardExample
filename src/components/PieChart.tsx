// 필요한 모듈을 import 합니다.
import * as React from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartTitle, ChartLegend, ChartTooltip } from '@progress/kendo-react-charts';
// ChartSeriesItemTooltip 컴포넌트를 import 합니다.
import { ChartSeriesItemTooltip } from '@progress/kendo-react-charts';

import { teamOrders } from '../resources/teamOrders.js';
import { categories } from '../resources/categories.js';

// 주문량 데이터를 저장합니다.
const data = Object.entries(teamOrders).map(([teamID, count]) => ({
  category: `Team ${teamID}`,
  value: count,
}));

// 툴팁을 렌더링하는 컴포넌트를 정의합니다.
const OrderTooltip: React.FC<any> = ({ point }) => {
  if (!point) {
    return null; // point가 undefined인 경우 null을 반환하여 아무것도 렌더링하지 않음
  }

  const totalOrders = Object.values(teamOrders).reduce((a, b) => a + b, 0);
  const orderPercentage = ((point.value / totalOrders) * 100).toFixed(2);

  return (
    <div>
      <h3>{point.category}</h3>
      <p>Order Percentage: {orderPercentage}%</p>
      <p>Total Orders: {point.value}</p>
    </div>
  );
};


// 차트 컴포넌트를 정의합니다.
const PieChart: React.FC = () => (
  <Chart>
    <ChartTitle text="Team Order Distribution" />
    <ChartLegend position="top" orientation="horizontal" />
    <ChartTooltip render={OrderTooltip} />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={categories} startAngle={45} />
    </ChartCategoryAxis>
    <ChartSeries>
      <ChartSeriesItem type="pie" data={data} field="value" categoryField="category">
        <ChartSeriesItemTooltip render={OrderTooltip} />
      </ChartSeriesItem>
    </ChartSeries>
  </Chart>
);


export default PieChart;