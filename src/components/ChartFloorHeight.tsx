import React, { useState, useEffect } from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import axios from "axios";
import { concrete } from "../interfaces/concrete";

const ChartFloorHeight = () => {
  const [concreteData, setConcreteData] = useState<concrete[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.129:8000/data/floor/height",
          {
            params: {
              floor_height_input: 2800,
            },
          }
        );
        const data = response.data;
        setConcreteData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart>
        <ChartSeries>
          <ChartSeriesItem
            type="line"
            data={concreteData}
            categoryField="id"
            field="value"
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
