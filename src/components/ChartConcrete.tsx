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
import axios from "axios";
import { concrete } from "./../interfaces/concrete";

let concreteArr: concrete[] = [];

const ChartConcrete = () => {
  //const [dataState, setDataState] = useState<concrete[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(
          "http://192.168.0.129:8000/data/concrete/value",
           { 
            params: { 
              min: 1.001,
              max: 1.002
            },
          }
        );
        const data = response.data;
        console.log("hello");
        console.log(data[0]);
        concreteArr = data;
         
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
            type="donut"
            data={concreteArr}
            categoryField="id"
            field="value"
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"
              //content={lebelContent}
            />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend visible={false} />
      </Chart>
    </div>
  );
};

export default ChartConcrete;
