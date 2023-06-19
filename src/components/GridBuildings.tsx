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
import "./Gridmembers.scss";

const initialDataState: State = {
  take: 10,
  skip: 0,
  group: [{ field: "project_id" }],
};

const aggregates: AggregateDescriptor[] = [
  { field: "id", aggregate: "average" },
  { field: "project_id", aggregate: "average" },
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

const GridBuildings = () => {
  const [dataState, setDataState] = useState<State>(initialDataState);
  const [result, setResult] = useState<DataResult>({ data: [], total: 0 });
  const [collapsedState, setCollapsedState] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.129:8000/data/building"
        );
        const data = response.data;
        const arr: employee[] = JSON.parse(data);

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
    tdElement: React.ReactElement<
      HTMLTableCellElement,
      string | React.JSXElementConstructor<any>
    > | null,
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
        <GridColumn field="id" title="id"></GridColumn>
        <GridColumn field="building_name" title="building_name"></GridColumn>
        <GridColumn field="building_type" title="building_type"></GridColumn>
        <GridColumn field="project_id" title="project_id"></GridColumn>
      </Grid>
    </div>
  );
};

export default GridBuildings;
