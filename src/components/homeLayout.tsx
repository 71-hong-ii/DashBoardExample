import React, { useState, useEffect } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Icon } from '@progress/kendo-react-common';
import './HomeLayout.scss';

export const items = [
  {
    text: 'Employees',
    selected: true,
    route: '/employees',
    icon: 'k-i-grid',
  },
  {
    text: 'Orders',
    selected: false,
    route: '/orders',
    icon: 'chart-line-markers',
  },
  {
    text: 'Home',
    selected: false,
    route: '/',
    icon: 'home',
  },
];

export const HomeLayout = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState('');

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const onSelect = (e: any) => {
    navigate(e.itemTarget.props.route);
  };

  useEffect(() => {
    const selectedItem = items.find((item) => item.route === location.pathname);
    if (selectedItem) {
      setSelected(selectedItem.text);
    }
  }, [location.pathname]);

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="custom-toolbar">
        <Button icon="menu" onClick={handleClick} className="menu-button" />

        <span
          className={
            selected === "Employees" || selected === "Orders"
              ? "selected-text"
              : ""
          }
        >
          {selected === "Employees"
            ? "Employees"
            : selected === "Orders"
            ? "Orders"
            : "Home"}
        </span>
      </div>

      <div>
        <Drawer
          expanded={expanded}
          position="start"
          mode="push"
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
            <Outlet />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
