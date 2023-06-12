import React from "react";
import { employees } from "./../resources/employees";
import Grid from "./Grid";

const Gridmember = () => {
  return (
    <div>
      <div className="card-container grid">
        <h3 className="card-title">team members</h3>
      </div>
      <span></span>
      <Grid data={employees}></Grid>
    </div>
  );
};

export default Gridmember;
