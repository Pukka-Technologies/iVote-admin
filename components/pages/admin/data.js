/* eslint-disable @next/next/no-img-element */

import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import React, { useEffect } from "react";

import Image from "next/image";
import { useStateValue } from "../../../context/StateProvider";

const UserItem = ({
  eventImg,
  name,
  date,
  status,
  opening_date,
  closing_date,
}) => (
  <article className="flex justify-between items-center py-[1em] border-b-2 ">
    <div className="flex items-center gap-6  w-[35%]">
      {eventImg  && (
        <div className="relative w-32 h-16 border border-gray-200 rounded-md">
          <Image src={eventImg} className="rounded-md" alt="image" objectFit="cover" layout="fill" />
        </div>
      )}
      <div className="w-full">
        <h3 className="font-bold">{name}</h3>
        {
          date && <p className="text-xs text-gray-400">Created at: {date}</p>
        }
      </div>
    </div>
    <div className="w-[45%] flex items-center justify-center gap-x-4">
    <div className="text-gray-500 flex flex-1 items-center justify-center">
      {opening_date}
    </div>
    <div className={`${status == "Opened"? 'text-green-600 bg-green-200':'text-red-600 bg-red-200'} flex px-2 py-1 rounded-sm items-center justify-center text-xs`}>
      {status}
    </div>
    <div className="text-gray-500 flex flex-1 items-center justify-center">
      {closing_date}
    </div>
    </div>
    <div className="flex gap-4 cursor-pointer w-[10%] items-end justify-end">
      <AiOutlineEye className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineEdit className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineDelete className="hover:text-gray-600 hover:scale-125" />
    </div>
  </article>
);

const AdminList = ({type}) => {
  const [{ events }, dispatch] = useStateValue();

  const formate_date = (date) => {
    const new_date = new Date(date);
    return new_date.toDateString();
  };

  // const data = type == "all" ? events && events.sort((a, b) => new Date(b.date) - new Date(a.date)) : events.sort((a, b) => new Date(b.opening_date) - new Date(a.opening_date)) || [];

  return (
    <div className="flex flex-col justify-center bg-white font-text mb-4 mt-6 px-[2em] py-[1em] rounded-lg">
      <h1 className="border-b-2 font-bold text-lg pb-[0.8em]">
        {type == "all" ? "All Events" : "Opened Events"}
      </h1>
      {/* table header */}

 
      {
        events &&
        events
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((event) => {
            // format date

            // check if event is opened or closed based on opening_date and closing_date
            const status =
              new Date(event.opening_date) < new Date() &&
              new Date(event.closing_date) > new Date()
                ? "Opened"
                : "Closed";
            return (
              <UserItem
                key={event._id}
                eventImg={event.imageURL}
                name={event.name}
                date={formate_date(event.createdAt)}
                opening_date={formate_date(event.opening_date)}
                closing_date={formate_date(event.closing_date)}
                status={status}
              />
            );
          })
      }
    </div>
  );
};

export default AdminList;
