import ContestantTable from "../../components/ContestantTable";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import { useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";

// import { GET_SESSION_USER } from "../../utils/session";





const Contestants = () => {
  return (
    <div className="flex h-screen">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <Navbar />
        <ContestantTable />
      </div>
    </div>
  );
};

export default Contestants;
