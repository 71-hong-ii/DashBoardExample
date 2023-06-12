import React from 'react';
import * as PropTypes from 'prop-types';

import {
  Chart as KendoChart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartLegend,
  ChartTooltip
} from '@progress/kendo-react-charts';
import { groupBy, filterBy } from '@progress/kendo-data-query';
import { useInternationalization } from '@progress/kendo-react-intl';
import { locales } from './../resources/locales';

export const Chart = (props) => {
  const { data } = props; // Team Efficiency 데이터를 props에서 가져옴

  // KendoReact에서 사용할 꺽은선 그래프에 필요한 데이터 포맷으로 변환
  const chartData = React.useMemo(() => {
    // 팀 별로 그룹화
    const groupedData = groupBy(data, [{ field: 'team' }]);

    // 팀 별로 그래프 데이터로 변환
    const chartData = [];
    for (const group of groupedData) {
      const team = group.value[0].team;
      const teamData = group.value.map((item) => ({
        category: item.category,
        value: item.efficiency
      }));

      chartData.push({
        team: team,
        data: teamData
      });
    }

    return chartData;
  }, [data]);

  const intl = useInternationalization(); // 국제화를 위한 인터내셔널라이제이션 훅 사용

  return (
    <KendoChart>
      <ChartLegend position="top" /> // 그래프 범례를 상단에 표시

      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          categories={data.map((item) => item.category)} // 카테고리 축에 카테고리 데이터 추가
          labels={{ rotation: 'auto' }} // 카테고리 레이블의 회전 방식 설정
        />
      </ChartCategoryAxis>

      <ChartValueAxis>
        <ChartValueAxisItem
          labels={{ format: '{0}%' }} // 값 축의 레이블 형식을 백분율로 설정
          title={{ text: intl.formatMessage(locales.efficiency) }} // 값 축의 제목 설정 (다국어 처리)
        />
      </ChartValueAxis>

      <ChartSeries>
        {chartData.map((teamData) => (
          <ChartSeriesItem
            key={teamData.team}
            type="line" // 꺽은선 그래프로 설정
            data={teamData.data} // 팀 별 데이터 연결
            name={teamData.team} // 팀 이름 설정
            markers={{ visible: true }} // 데이터 포인트에 마커 표시
          />
        ))}
      </ChartSeries>

      <ChartTooltip shared={true} format="{0}%" /> // 툴팁 설정 (다국어 처리, 백분율 형식)

    </KendoChart>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired // Team Efficiency 데이터 prop의 타입 검사
};

export default Chart;