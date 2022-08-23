import React from "react";
import Body from "../components/Body";
import SideBar from "../components/SideBar";

const main = () => {
  return (
    <div className="flex h-screen">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <Body />
      </div>
    </div>
  );
};

export default main;
