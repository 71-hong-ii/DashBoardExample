import PieChart from "./../components/PieChart"
import BarChart from "./../components/BarChart"
import { HomeLayout } from "../components/homeLayout"


export const Orders = () => {
    return (
      <div>
        <HomeLayout>
          <PieChart />
          <BarChart />
        </HomeLayout>
      </div>
    );
   }