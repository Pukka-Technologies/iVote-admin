import React from "react";
import  EventForm  from "./form";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";


const Event = () => {
  return (
    <div className="flex h-screen">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <Navbar />
      <EventForm/>
      </div>
    </div>
  );
};

export default Event;
