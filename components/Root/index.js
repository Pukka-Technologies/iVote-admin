import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import { Dashboard } from "../pages";
import SideBar from "../Sidebar";

const Root = () => {
  const [page, setPage] = useState("Dashboard");
  const [component, setComponent] = useState(<Dashboard />);
  return (
    <div className="flex h-screen w-screen overflow-hidden ">
      <SideBar page={page} setComponent={setComponent} setPage={setPage} />
      <div className="w-full flex flex-col">
        <Navbar />
        <div className="w-full h-[88vh] bg-gray-100 px-5 overflow-y-auto scrollbar-hidden">
          {component}
        </div>
      </div>
    </div>
  );
};

export default Root;
