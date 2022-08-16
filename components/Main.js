import React from "react";
import Body from "./Body";
import SideBar from "./SideBar";

const Main = () => {
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

export default Main;
