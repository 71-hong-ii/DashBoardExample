import React, { useState, useEffect } from 'react';
import { TileLayout, TileLayoutItem } from '@progress/kendo-react-layout';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

interface OrderData {
  teamID: string;
}

const Orders: React.FC = () => {
  const [teamOrders, setTeamOrders] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://13.59.95.158:8000/data/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: OrderData[] = await response.json();

        const orders: { [teamID: string]: number } = {};
        data.forEach(order => {
          const teamID = order.teamID;
          if (teamID) {
            if (orders[teamID]) {
              orders[teamID] += 1;
            } else {
              orders[teamID] = 1;
            }
          }
        });
        setTeamOrders(orders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const dataTiles = [
    {
      defaultPosition: {
        col: 1,
        colSpan: 1,
        rowSpan: 1,
      },
      header: "PieChart here",
      body: <PieChart teamOrders={teamOrders} />,
    },
    {
      defaultPosition: {
        col: 2,
        colSpan: 1,
        rowSpan: 1,
      },
      header: "BarChart here",
      body: <BarChart teamOrders={teamOrders} />,
    },
  ];

  return (
    <div>
      <TileLayout columns={2} items={dataTiles}></TileLayout>
    </div>
  );
};

export default Orders;
