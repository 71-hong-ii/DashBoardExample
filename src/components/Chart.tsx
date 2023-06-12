import React from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem } from '@progress/kendo-react-charts';

const TeamEfficiencyChart = () => {
  // Team Efficiency 데이터
  const teamEfficiencyData = [
    { team: 'Team A', efficiency: 80 },
    { team: 'Team B', efficiency: 60 },
    { team: 'Team C', efficiency: 90 },
    { team: 'Team D', efficiency: 70 }
  ];

  return (
    <Chart>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={['Team A', 'Team B', 'Team C', 'Team D']} />
      </ChartCategoryAxis>
      <ChartSeries>
        <ChartSeriesItem data={teamEfficiencyData} field="efficiency" />
      </ChartSeries>
    </Chart>
  );
};

export default TeamEfficiencyChart;
