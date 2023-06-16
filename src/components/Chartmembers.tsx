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
import {employees} from "./../resources/employees"

const Chartmember = () => {
//const [arrData, setArrData] = useState(arr);
 //const lebelContent = (e : employee) => e.rating.valueOf().toString();

  return (
    <div>
      <Chart>
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={arr}
            categoryField="rating"
            field="teamId"
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

export default Chartmember;
