// 필요한 모듈을 import 합니다.
import * as React from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartTitle, ChartLegend } from '@progress/kendo-react-charts';

import {orders} from './../resources/orders.js';


// 데이터를 정의합니다. 이는 실제 데이터에 따라 변경되어야 합니다.
const categories = ["January 2020", "February 2020", "March 2020", "April 2020"];

// 팀 오더를 정의합니다.
const teamOrders: { [key: number]: number } = {};
orders.forEach((order) => {
  const teamID = (order.teamID);
  if (teamOrders[teamID]) {
    teamOrders[teamID] += 1; // 이미 해당 팀의 주문이 있을 경우 1 증가
  } else {
    teamOrders[teamID] = 1; // 해당 팀의 첫 번째 주문인 경우 1로 초기화
  }
});

// 주문량 데이터를 저장합니다.
const data = Object.entries(teamOrders).map(([teamID, count]) => ({
  category: `Team ${teamID}`,
  value: count,
}));

// 차트 컴포넌트를 정의합니다.
const MyChart: React.FC = () => (
  <Chart>
    <ChartTitle text="Team Order Distribution" /> // 차트의 제목을 설정합니다.
    <ChartLegend position="top" orientation="horizontal" /> // 범례의 위치와 방향을 설정합니다.
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={categories} startAngle={45} /> // 카테고리 축을 설정합니다.
    </ChartCategoryAxis>
    <ChartSeries>
      <ChartSeriesItem type="pie" data={data} field="value" categoryField="category" />
    </ChartSeries>
  </Chart>
);

export default MyChart;