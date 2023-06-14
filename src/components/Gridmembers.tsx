import React from "react";
import {
  Grid,
  GridColumn,
  GridColumnMenuSort,
  GridColumnMenuFilter,
  GridToolbar,
} from "@progress/kendo-react-grid";
//import Grid from "./Grid";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
  IntlService,
} from "@progress/kendo-react-intl";
import { employees } from "./../resources/employees";
import { teams } from "./../resources/teams";
import { orders } from "./../resources/orders";

const Gridmember = () => {
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
        data={employees}
      >
        <GridColumn field = "employees" title="Employee">
          <GridColumn field="fullName" title="fullName"></GridColumn>
          <GridColumn field="jobTitle" title="jobTitle"></GridColumn>
          <GridColumn field="country" title="country"></GridColumn>
        </GridColumn>
        <GridColumn title="Performance">
          <GridColumn field="rating"></GridColumn>
          <GridColumn field="target"></GridColumn>
          <GridColumn field="budget"></GridColumn>
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
