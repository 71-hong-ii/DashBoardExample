import { Grid } from "@progress/kendo-react-grid";
import { TileLayout } from "@progress/kendo-react-layout";
import {Gridmember} from "../components/Gridmembers";
import Chartmember from "../components/Chartmembers";
const tiles = [
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "First is",
    body: <Chartmember/>,
  },
  {
    defaultPosition: {
      col: 2,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Second is",
    body: "two",
  },
  {
    defaultPosition: {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Third is",
    body: "three",
  },
];

const dataTiles = [
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Team members tileLayout here",
    body: <Gridmember />,
  },
];

export const Employees = () => {
  return (
    <div>
      <TileLayout columns={3} items={tiles} rowHeight={300}></TileLayout>
      <TileLayout columns={1} items={dataTiles}></TileLayout>
    </div>
  );
};
