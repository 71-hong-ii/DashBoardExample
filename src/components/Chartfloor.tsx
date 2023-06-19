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

const Chartfloor = () => {
  const [dataState, setDataState] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.129:8000/data/floor/category",
          {
            params: {
              category_input: "지상층",
            },
          }
        );
        const data = response.data;
        console.log("hello");
        console.log(data);

        setDataState(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default Chartfloor;
