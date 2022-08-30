import React from "react";
import ConBody from "../../components/ConBody";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";


const Contestants = () => {
  return (
    <div className="flex h-screen">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <Navbar />
        <ConBody/>
      </div>
    </div>
  );
};

export default Contestants;
