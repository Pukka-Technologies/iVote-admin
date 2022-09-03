import Events from "../events";
import Tabs from "./Tabs";

const Dashboard = () => {
  return (
    <div className="h-full  box-border">
      <Tabs />
      <Events />
    </div>
  );
};

export default Dashboard;
