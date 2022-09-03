/* eslint-disable @next/next/no-img-element */

import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import React, { useEffect } from "react";

import Image from "next/image";
import { useStateValue } from "../../../context/StateProvider";
import { fetchSession, getAllAdmins } from "../../../utils";

const UserItem = ({
  eventImg,
  name,
  date,
  status,
  username,
  email,
  closing_date,
}) => (
  <article className="flex justify-between items-center py-[1em] border-b-2 ">
    <div className="flex items-center gap-6 flex-1">
      {eventImg  && (
        <div className="relative w-32 h-16 border border-gray-200 rounded-md">
          <Image src={eventImg} className="rounded-md" alt="image" objectFit="cover" layout="fill" />
        </div>
      )}
      <div className="w-full">
        <h3 className="font-bold">{name}</h3>
        {
          date && <p className="text-xs text-gray-400"> {email}</p>
        }
      </div>
    </div>

    <div className="flex-1 flex items-center justify-center">
      {username}
    </div>
    
    <div className="flex gap-4 cursor-pointer flex-1 items-end justify-end">
      <AiOutlineEye className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineEdit className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineDelete className="hover:text-gray-600 hover:scale-125" />
    </div>
  </article>
);

const AdminList = ({type}) => {
  const [{ events, admins, user }, dispatch] = useStateValue();

  const formate_date = (date) => {
    const new_date = new Date(date);
    return new_date.toDateString();
  };

  useEffect(() => {
    fetchSession(dispatch)
    getAllAdmins(user?.access_token, dispatch)
   console.log("admins >>",admins)
  }, [])
  

  // const data = type == "all" ? events && events.sort((a, b) => new Date(b.date) - new Date(a.date)) : events.sort((a, b) => new Date(b.opening_date) - new Date(a.opening_date)) || [];

  return (
    <div className="flex flex-col justify-center bg-white font-text mb-4 mt-6 px-[2em] py-[1em] rounded-lg">
      <h1 className="border-b-2 font-bold text-lg pb-[0.8em]">
        {type == "all" ? "All Events" : "Opened Events"}
      </h1>
      {/* table header */}

 
      {
        admins &&
        admins
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((admin) => {
            // format date

            // check if event is opened or closed based on opening_date and closing_date
            const status =
              new Date(admin.opening_date) < new Date() &&
              new Date(admin.closing_date) > new Date()
                ? "Opened"
                : "Closed";
            return (
              <UserItem
                key={admin._id}
                eventImg={admin.avatar}
                name={admin.full_name}
                username={admin.username}
                date={formate_date(admin.createdAt)}
                email={admin?.email}
                closing_date={formate_date(admin.closing_date)}
                status={status}
              />
            );
          })
      }
    </div>
  );
};

export default AdminList;
