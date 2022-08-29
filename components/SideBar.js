import React from "react";
import { MdOutlineEmojiEvents, MdPeopleOutline } from "react-icons/md";
import { AiOutlineAppstoreAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { LOGOUT } from "../utils";


const SideBar = () => {
  const [{}, dispatch] = useStateValue()
  return (
    <section className="flex flex-col justify-center font-text p-8">
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
        <li onClick={()=> LOGOUT(dispatch)} className="flex gap-3 items-center cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]">
          <AiOutlineUsergroupAdd />
          <span>Log out</span>
        </li>
      </ul>
    </section>
  );
};

export default SideBar;
