import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";

export const items = [
  {
    text: "Employees",
    selected: false,
    route: "/employees",
    icon: "k-i-grid",
  },
  {
    text: "Orders",
    selected: false,
    route: "/orders",
    icon: "k-i-grid",
  },
];

export const HomeLayout = (props: any) => { 
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(true);

  /*
  const setSelectedItem = (pathName:any) => {
    let currentPath:any = items.find((item) => item.route === pathName);
    if (currentPath) {
      return currentPath.text;
    }
  };
*/

  const handleClick = () => {
    setExpanded(!expanded);
  };
  const onSelect = (e: any) => {
    navigate(e.itemTarget.props.route);
  };

  //const selected = setSelectedItem(location.pathname);
  let selected = "Employees";
  return (
    <div>
      <div className="custom-toolbar">
        <Button icon="menu" onClick={handleClick} />

        <span className="overview">
          {selected === "Employees" ? "Overview" : selected}
        </span>
      </div>

      <div>
        <Drawer
          expanded={expanded}
          position={"start"}
          mode={"push"}
          width={240}
          items={items.map((item) => ({
            ...item,
            selected: item.text === selected,
          }))}
          onSelect={onSelect}
          className="drawer"
        >
          <DrawerContent>
            {props.children}
            <Outlet />{" "}
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
