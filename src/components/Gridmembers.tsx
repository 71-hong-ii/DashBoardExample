import React, { useState, useEffect } from "react";
import {
  Grid,
  GridColumn,
  GridToolbar,
  GridFilterChangeEvent,
  GridExpandChangeEvent,
  GridCellProps,
} from "@progress/kendo-react-grid";
import {
  CompositeFilterDescriptor,
  GroupDescriptor,
  process,
  AggregateDescriptor,
} from "@progress/kendo-data-query";

interface Employee {
  fullName: string;
  jobTitle: string;
  country: string;
  rating: number;
  target: number;
  budget: number;
  phone: string;
  address: string;
}

const initialDataState = {
  skip: 0,
  take: 10,
  group: [{ field: "rating" }],
};

const aggregates: AggregateDescriptor[] = [
  { field: "rating", aggregate: "average" },
  { field: "budget", aggregate: "average" },
];

const Gridmember = () => {
  const [dataState, setDataState] = useState(initialDataState);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [collapsedState, setCollapsedState] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/dataframe");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const dataStateChange = (event: any) => {
    setDataState(event.data);
  };

  const expandChange = (event: any) => {
    const item = event.dataItem;

    if (item.groupId) {
      const newCollapsedIds = !event.value
        ? [...collapsedState, item.groupId]
        : collapsedState.filter((groupId) => groupId !== item.groupId);
      setCollapsedState(newCollapsedIds);
    }
  };

  const cellRender = (
    tdElement: React.ReactElement<HTMLTableCellElement> | null,
    cellProps: GridCellProps
  ) => {
    if (cellProps.rowType === "groupFooter") {
      if (cellProps.field === "rating") {
        return (
          <td aria-colindex={cellProps.columnIndex} role="gridcell">
            Average: {cellProps.dataItem.aggregates?.rating?.average}
          </td>
        );
      } else if (cellProps.field === "budget") {
        return (
          <td aria-colindex={cellProps.columnIndex} role="gridcell">
            Average: {cellProps.dataItem.aggregates?.budget?.average}
          </td>
        );
      }
    }
    return tdElement as React.ReactElement<HTMLTableCellElement>;
  };

  const newData = process(employees, dataState);

  return (
    <div>
      <div className="card-container grid">
        <h3 className="card-title">Team members</h3>
      </div>
      <Grid
        style={{ height: "520px" }}
        data={newData}
        filterable={true}
        sortable={true}
        pageable={{ pageSizes: true }}
        groupable={{ footer: "visible" }}
        onDataStateChange={dataStateChange}
        onExpandChange={expandChange}
        expandField="expanded"
        cellRender={cellRender}
        {...dataState}
      >
        <GridToolbar />
        <GridColumn field="fullName" title="Full Name" />
        <GridColumn field="jobTitle" title="Job Title" />
        <GridColumn field="country" title="Country" />
        <GridColumn field="rating" title="Rating" filter="numeric" />
        <GridColumn field="target" title="Target" />
        <GridColumn field="budget" title="Budget" filter="numeric" />
        <GridColumn field="phone" title="Phone" />
        <GridColumn field="address" title="Address" />
      </Grid>
    </div>
  );
};

export default Gridmember;
