import React from "react";
import { MdOutlineEmojiEvents, MdPeopleOutline } from "react-icons/md";
import { AiOutlineAppstoreAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";


const SideBar = () => {
  return (
    <div className="flex flex-col justify-center font-text p-10">
      {/*logo*/}
      <h1 className="font-bold text-[1.3em] text-center">Media Billo</h1>
      <ul className="pt-[4em] gap-3 flex flex-col">
        <li className="flex gap-3 items-center bg-green-200 cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]">
          <MdOutlineEmojiEvents />
          <span>Events</span>
        </li>
        <li className="flex gap-3 items-center cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]">
          <AiOutlineAppstoreAdd />
          <span>Create Events</span>
        </li>
        <li className="flex gap-3 items-center cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]">
          <MdPeopleOutline />
          <span>Contestants</span>
        </li>
        <li className="flex gap-3 items-center cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]">
          <AiOutlineUsergroupAdd />
          <span>Add Contestants</span>
        </li>
        <li className="flex gap-3 items-center cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]">
          <FiSettings />
          <span>Settings</span>
        </li>
        <li className="flex gap-3 items-center cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]">
          <RiAdminLine />
          <span>Admins</span>
        </li>
        <li className="flex gap-3 items-center cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]">
          <AiOutlineUsergroupAdd />
          <span>Add Admins</span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
