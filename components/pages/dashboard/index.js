import EventsList from "../events/data";
import Tabs from "./Tabs";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <Tabs />
      <EventsList type={"ongoing"} showSelector={false} />
    </div>
  );
};

export default Dashboard;
