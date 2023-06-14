// 필요한 모듈을 import 합니다.
import * as React from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartTitle, ChartLegend } from '@progress/kendo-react-charts';

import {teams} from './../resources/teams.js';

// 데이터를 정의합니다. 이는 실제 데이터에 따라 변경되어야 합니다.
const categories = ["January 2020", "February 2020", "March 2020", "April 2020"];

// 차트 컴포넌트를 정의합니다.
const MyChart: React.FC = () => (
  <Chart>
    <ChartTitle text="Team Efficency" /> // 차트의 제목을 설정합니다.
    <ChartLegend position="top" orientation="horizontal" /> // 범례의 위치와 방향을 설정합니다.
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={categories} startAngle={45} /> // 카테고리 축을 설정합니다.
    </ChartCategoryAxis>
    <ChartSeries>
      {teams.map((item, idx) => (
        <ChartSeriesItem
          key={idx}
          type="line" // 차트의 형태를 설정합니다. 이 경우 선형 차트를 사용합니다.
          data={item.data}
          name={item.name}
        />
      ))}
    </ChartSeries>
  </Chart>
);

export default MyChart;