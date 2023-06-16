import React, { useState, useEffect } from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
  ChartTooltip,
} from "@progress/kendo-react-charts";
import {
  TooltipContext,
  SharedTooltipContext,
} from "@progress/kendo-react-charts";

interface OrderData {
  teamID: string;
}

const PieChart: React.FC = () => {
  const [teamOrders, setTeamOrders] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://13.59.95.158:8000/data/orders");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: OrderData[] = await response.json();

        const orders: { [teamID: string]: number } = {};
        data.forEach((order) => {
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
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const categories = Object.keys(teamOrders).map((teamID) => `Team ${teamID}`);
  const data = Object.entries(teamOrders).map(([teamID, count]) => ({
    category: `Team ${teamID}`,
    value: count,
  }));

  const OrderTooltip = (
    props: TooltipContext | SharedTooltipContext
  ): React.ReactNode => {
    const point = "point" in props ? props.point : undefined;
    if (!point) {
      return null;
    }

    const totalOrders = Object.values(teamOrders).reduce((a, b) => a + b, 0);
    const orderPercentage = ((point.value / totalOrders) * 100).toFixed(2);

    return (
      <div>
        <h3>{String(point.category)}</h3>
        <p>Order Percentage: {orderPercentage}%</p>
        <p>Total Orders: {String(point.value)}</p>
      </div>
    );
  };

  return (
    <Chart>
      <ChartTitle text="Team Order Distribution" />
      <ChartLegend position="top" orientation="horizontal" />
      <ChartTooltip render={OrderTooltip} />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={categories} startAngle={45} />
      </ChartCategoryAxis>
      <ChartSeries>
        <ChartSeriesItem
          type="pie"
          data={data}
          field="value"
          categoryField="category"
        />
      </ChartSeries>
    </Chart>
  );
};

export default PieChart;
