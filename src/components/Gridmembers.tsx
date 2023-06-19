import React, {
  useState,
  useEffect,
  SetStateAction,
  JSXElementConstructor,
} from "react";
import {
  Grid,
  GridColumn,
  GridColumnMenuSort,
  GridColumnMenuFilter,
  GridToolbar,
  GridFilterChangeEvent,
  GridExpandChangeEvent,
  GridGroupChangeEvent,
  GridDataStateChangeEvent,
  GridCellProps,
} from "@progress/kendo-react-grid";
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
import './Gridmembers.scss';

const initialDataState: State = {
  take: 10,
  skip: 0,
  group: [{ field: "rating" }],
};

const aggregates: AggregateDescriptor[] = [
  { field: "rating", aggregate: "average" },
  { field: "budget", aggregate: "average" },
];

const processWithGroups = (data: employee[], dataState: State) => {
  const groups = dataState.group;
  if (groups) {
    groups.map((group) => (group.aggregates = aggregates));
  }
  dataState.group = groups;
  const newDataState = process(data, dataState);

  setGroupIds({ data: newDataState.data, group: dataState.group });

  return newDataState;
};

let arr: employee[] = [];
const Gridmember = () => {
  const [dataState, setDataState] = useState<State>(initialDataState);
  const [result, setResult] = useState<DataResult>({ data: [], total: 0 });
  const [collapsedState, setCollapsedState] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.129:8000/data/employees",
          //"http://13.59.95.158:8000/data/employees",
        );
        const data = response.data;
        //console.log(data[0]);
        arr = data;
  
        const newDataState = processWithGroups(arr, dataState);
        setResult(newDataState);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [dataState]);

  const newData = setExpandedState({
    data: result.data,
    collapsedIds: collapsedState,
  });

  const dataStateChange = (event: GridDataStateChangeEvent) => {
    const newDataState = processWithGroups(result.data, event.dataState);
    setResult(newDataState);
    setDataState(event.dataState);
  };

  const expandChange = (event: GridExpandChangeEvent) => {
    const item = event.dataItem;

    if (item.groupId) {
      const newCollapsedIds = !event.value
        ? [...collapsedState, item.groupId]
        : collapsedState.filter((groupId) => groupId !== item.groupId);
      setCollapsedState(newCollapsedIds);
    }
  };

  const cellRender = (
    tdElement: React.ReactElement<HTMLTableCellElement, string | React.JSXElementConstructor<any>> | null,
    cellProps: GridCellProps
  ): JSX.Element => {
    if (cellProps.rowType === "groupFooter") {
      if (cellProps.field === "UnitPrice") {
        return (
          <td aria-colindex={cellProps.columnIndex} role="gridcell">
            Average: {cellProps.dataItem.aggregates.UnitPrice.average}
          </td>
        );
      } else if (cellProps.field === "UnitsInStock") {
        return (
          <td aria-colindex={cellProps.columnIndex} role="gridcell">
            Sum: {cellProps.dataItem.aggregates.UnitsInStock.sum}
          </td>
        );
      }
    }
    return tdElement as JSX.Element;
  };

  return (
    <div>
      <div className="card-container grid">
        <h3 className="card-title">Team members</h3>
      </div>
      <span></span>
      <Grid
        style={{ height: "520px" }}
        resizable={true}
        reorderable={true}
        filterable={true}
        sortable={true}
        pageable={{ pageSizes: true }}
        total={result.total}
        groupable={{ footer: "visible" }}
        data={newData}
        onDataStateChange={dataStateChange}
        {...dataState}
        onExpandChange={expandChange}
        expandField="expanded"
        cellRender={cellRender}
      >
        <GridColumn field="employees" title="Employee" groupable={false}>
          <GridColumn field="fullName" title="fullName"></GridColumn>
          <GridColumn field="jobTitle" title="jobTitle"></GridColumn>
          <GridColumn field="country" title="country"></GridColumn>
        </GridColumn>
        <GridColumn title="Performance" groupable={false}>
          <GridColumn field="rating" filter="numeric"></GridColumn>
          <GridColumn field="target"></GridColumn>
          <GridColumn field="budget" filter="numeric"></GridColumn>
        </GridColumn>
        <GridColumn title="Contacts" groupable={false}>
          <GridColumn field="phone"></GridColumn>
          <GridColumn field="address"></GridColumn>
        </GridColumn>
      </Grid>
    </div>
  );
};

export { Gridmember ,arr};
