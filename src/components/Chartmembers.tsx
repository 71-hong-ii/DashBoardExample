import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
  IntlService,
} from "@progress/kendo-react-intl";
import {
  filterBy,
  CompositeFilterDescriptor,
  GroupDescriptor,
  groupBy,
  GroupResult,
  State,
  DataResult,
  process,
  AggregateDescriptor,
} from "@progress/kendo-data-query";
import {
  setExpandedState,
  setGroupIds,
} from "@progress/kendo-react-data-tools";
import { employee } from "./../interfaces/employee";
import axios from "axios";

import { arr } from "./Gridmembers";

interface RatingData {
  rating: string;
  percentage: number;
}
const Chartmember = () => {
  const [perData, setPerData] = useState<RatingData[]>([]);
  //const lebelContent = (e : employee) => e.rating.valueOf().toString();
  const calculatePercentage = (): RatingData[] => {
    const data = arr;
    const totalCount = data.length;
    const ratingCounts: { [key: string]: number } = {};

    // Count the occurrences of each rating
    data.forEach((item) => {
      const rating = item.rating.toString(); // Convert rating to string
      ratingCounts[rating] = ratingCounts[rating]
        ? ratingCounts[rating] + 1
        : 1;
    });

    // Calculate the percentage for each rating category
    const percentages: RatingData[] = Object.keys(ratingCounts).map(
      (rating) => {
        const count = ratingCounts[rating];
        const percentage = (count / totalCount) * 100;
        return { rating, percentage };
      }
    );

    return percentages;
  };
  useEffect(() => {
    const fetchData = async () => {
      dataWithPercentages = calculatePercentage();
      setPerData(dataWithPercentages);
    };
    fetchData();
  }, [perData]);

  let dataWithPercentages: RatingData[];

  return (
    <div>
      <Chart>
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={perData}
            categoryField="rating"
            field="percentage"
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"
              content={({ dataItem }) =>
                `${dataItem.rating} (${dataItem.percentage.toFixed(2)}%)`
              }
            />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend visible={false} />
      </Chart>
    </div>
  );
};

export default Chartmember;
