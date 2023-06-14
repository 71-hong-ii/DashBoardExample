import React, { useState } from "react";
import {
  Grid,
  GridColumn,
  GridColumnMenuSort,
  GridColumnMenuFilter,
  GridToolbar,
  GridFilterChangeEvent,
  GridExpandChangeEvent,
  GridGroupChangeEvent,
} from "@progress/kendo-react-grid";
//import Grid from "./Grid";
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
} from "@progress/kendo-data-query";
import { setGroupIds } from "@progress/kendo-react-data-tools";
import { employees } from "./../resources/employees";
import { teams } from "./../resources/teams";
import { orders } from "./../resources/orders";
import { employee } from "./../interfaces/employee";

const initialFilter: CompositeFilterDescriptor = {
  logic: "and",
  filters: [{ field: "fullName", operator: "contains", value: "" }],
};
const initialGroup: GroupDescriptor[] = [{ field: "rating" }];
const processWithGroups = (data: employee[], group: GroupDescriptor[]) => {
  const newDataState = groupBy(data, group);

  setGroupIds({ data: newDataState, group: group });

  return newDataState;
};

const Gridmember = () => {
  const [filter, setFilter] = useState(initialFilter);
  const [group, setGroup] = useState(initialGroup);
  const [resultState, setResultState] = useState<GroupResult[]>(
    processWithGroups(employees, initialGroup)    
  );
  const onGroupChange = React.useCallback((event: GridGroupChangeEvent) => {
    const newDataState = processWithGroups(employees, event.group);

    setGroup(event.group);
    setResultState(newDataState);
  }, []);
  
  return (
    <div>
      <div className="card-container grid">
        <h3 className="card-title">team members</h3>
      </div>
      <span></span>
      <Grid
        style={{
          height: "400px",
        }}
        data={filterBy(employees, filter)}
        filterable={true}
        filter={filter}
        onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
      >
        <GridColumn field="employees" title="Employee">
          <GridColumn field="fullName" title="fullName"></GridColumn>
          <GridColumn field="jobTitle" title="jobTitle"></GridColumn>
          <GridColumn field="country" title="country"></GridColumn>
        </GridColumn>
        <GridColumn title="Performance">
          <GridColumn field="rating" filter="numeric"></GridColumn>
          <GridColumn field="target"></GridColumn>
          <GridColumn field="budget" filter="numeric"></GridColumn>
        </GridColumn>
        <GridColumn title="Contacts">
          <GridColumn field="phone"></GridColumn>
          <GridColumn field="address"></GridColumn>
        </GridColumn>
      </Grid>
    </div>
  );
};

export default Gridmember;
