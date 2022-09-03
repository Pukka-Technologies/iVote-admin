import Events from "../events";
import Tabs from "./Tabs";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <Tabs />
      <Events />
    </div>
  );
};

export default Dashboard;
