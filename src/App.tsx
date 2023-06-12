import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import kendoka from "./kendoka.svg";
import "./App.scss";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import Chart from "./components/Chart";
import Gridmember from "./components/Gridmembers";

function App() {
  const [contextState, setContextState] = React.useState({
    localeId: "en-US",
    firstName: "Peter",
    lastName: "Douglas",
    middleName: "",
    email: "peter.douglas@progress.com",
    phoneNumber: "(+1) 8373-837-93-02",
    avatar: null,
    isInPublicDirectory: true,
    biography: "",
    teamId: 1,
  });

  return (
    <div className="App">
      <Chart></Chart>
      <Gridmember></Gridmember>
    </div>
  );
}

export default App;
