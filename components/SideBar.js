import React from "react";
import { MdOutlineEmojiEvents, MdPeopleOutline } from "react-icons/md";
import { AiOutlineAppstoreAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";


const SideBar = () => {
  return (
    <div className="flex flex-col justify-center font-text">
      {/*logo*/}
      <h1>Media Billo</h1>
      <ul>
        <li>
          <MdOutlineEmojiEvents />
          <span>Events</span>
        </li>
        <li>
          <AiOutlineAppstoreAdd />
          <span>Create Events</span>
        </li>
        <li>
          <MdPeopleOutline />
          <span>Contestants</span>
        </li>
        <li>
          <AiOutlineUsergroupAdd />
          <span>Add Contestants</span>
        </li>
        <li>
          <FiSettings />
          <span>Settings</span>
        </li>
        <li>
          <RiAdminLine />
          <span>Admins</span>
        </li>
        <li>
          <AiOutlineUsergroupAdd />
          <span>Add Admins</span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
