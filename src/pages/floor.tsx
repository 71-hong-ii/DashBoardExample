import React from 'react';
import { TileLayout } from "@progress/kendo-react-layout";
import Chartfloor from '../components/Chartfloor';

const tiles = [
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "floor",
    body: "one",
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

export const Floor: React.FC = () => {
  return (
    <div>
      <Chartfloor></Chartfloor>
    </div>
  );
};
