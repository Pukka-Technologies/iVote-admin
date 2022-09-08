/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import React, { useEffect } from "react";
import SearchBar from "../Searchbar";
import adminImg from "../../public/assets/admin.jpg";
import { useStateValue } from "../../context/StateProvider";
import { getAllVotes } from "../../utils";

const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    getAllVotes(user?.access_token, (data) => {
      if (data.success) {
        dispatch({
          type: "SET_VOTES",
          votes: data.data,
        });
        console.log("votes⛳", data.data);
      }
    });
  }, []);
  return (
    <nav className="w-full flex font-text py-4 px-6 justify-between items-center">
      <SearchBar />
      <div className="flex items-center justify-center gap-3">
        <div className="text-right flex-col flex items-end justify-center">
          <h3 className="font-extrabold">Howdy! {user.username}</h3>
          <p className="text-sm text-gray-600">{user.is_super? "Super Admin":"Administrator"}</p>
        </div>
        <div className="relative w-12 h-12">
          <Image
            src={user.avatar || adminImg}
            alt="admin"
            className="h-full w-full rounded-full"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
