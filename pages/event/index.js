import React from "react";
import  Form  from "./form";
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
      <Form/>
      </div>
    </div>
  );
};

export default Event;
