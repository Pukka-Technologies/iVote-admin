/* eslint-disable @next/next/no-img-element */

import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import React, { useEffect } from "react";

import Image from "next/image";
import { useStateValue } from "../../../context/StateProvider";
import { fetchSession, getAllAdmins } from "../../../utils";
import { Empty, Fetching } from "../../Promises";
import { FiSearch } from "react-icons/fi";

const UserItem = ({ data }) => {
  const { _id, username, email, avatar, is_super, full_name } = data;
  return (
    <article className="flex justify-between items-center py-[1em] border-b-2 ">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-36 h-16 border border-gray-200 rounded-md">
          <Image
            src={avatar}
            className="rounded-md"
            alt="image"
            objectFit="cover"
            layout="fill"
          />
        </div>

        <div className="w-full">
          <h3 className="font-bold">
            {full_name} (<span>{username}</span>)
          </h3>
          <p className="text-xs text-gray-400"> {email}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {is_super ? "Super Admin" : "Sys Admin"}
      </div>

      <div className="flex gap-4 cursor-pointer flex-1 items-end justify-end">
        <AiOutlineEye className="hover:text-gray-600 hover:scale-125" />
        <AiOutlineEdit className="hover:text-gray-600 hover:scale-125" />
        <AiOutlineDelete className="hover:text-gray-600 hover:scale-125" />
      </div>
    </article>
  );
};

const AdminList = ({ type }) => {
  const [{ admins, user }, dispatch] = useStateValue();

  useEffect(() => {
    fetchSession(dispatch);
    getAllAdmins(user?.access_token, dispatch);
  }, []);

  const [filter, setFilter] = React.useState(admins);
  return (
    <div className="flex flex-col min-h-[80vh] bg-white font-text  mt-6 px-[2em] py-[1em] rounded-lg">
      <div className="border-b-2 pb-[0.8em] flex items-center justify-between px-5">
        <h1 className="font-bold text-lg">System Administrators</h1>
        <div className="w-[40%] flex items-center justify-center border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-gray-400">
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none w-full"
            onChange={(e) => {
              const filtered = admins.filter((admin) =>
                admin.username
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setFilter(filtered);
            }}
          />
          <FiSearch className="" />
        </div>
      </div>
      {/* table header */}

      {admins &&
        filter
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((admin) => {
            return <UserItem key={admin._id} data={admin} />;
          })}
      {admins && admins.length === 0 && <Fetching text="Loading data....." />}
      {filter.length === 0 && <Empty text={"No records found"} />}
      {!admins && <Fetching text="Loading..." />}
    </div>
  );
};

export default AdminList;
