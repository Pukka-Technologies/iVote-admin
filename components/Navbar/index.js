/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import adminImg from "../../public/assets/admin.jpg";
import SearchBar from "../Searchbar";

const Navbar = () => {
  return (
    <nav className="w-full flex font-text py-4 px-6 justify-between items-center">
      <SearchBar />
      <div className="flex items-center justify-center gap-3">
        <div className="text-right flex-col flex items-end justify-center">
          <h3 className="font-extrabold">Akosua D</h3>
          <p className="text-sm text-gray-600">Administrator</p>
        </div>
        <div className="w-12 h-12">
          <Image
            src={adminImg}
            alt="admin"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
