import React, { useState, useEffect } from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import axios from "axios";

const ChartFloorHeight = () => {
  const [heightData, setHeightData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.129:8000/data/floor/height",
          {
            params: {
              floor_height_input: 2000,
            },
          }
        );
        const data = response.data;
        setHeightData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <Chart>
        <ChartSeries>
          <ChartSeriesItem
            type="line" // Change type to 'bar'
            data={heightData}
            xField="id"
            yField="floor_height"
          >
            <ChartSeriesLabels color="#fff" background="none" />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend visible={false} />
      </Chart>
    </div>
  );
};

export default React.memo(ChartFloorHeight);
