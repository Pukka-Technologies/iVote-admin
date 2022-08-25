import React from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import EventsItem from "../utils/eventsTable";

const EventItem = ({ eventImg, name, date, status }) => (
  <article className="flex justify-between items-center py-[1em] border-b-2 ">
    <div className="flex items-center gap-6 w-[20%]">
      <img src={eventImg} className="w-14 h-14 rounded-md" />
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
    <div className="text-gray-500">{status}</div>
    <div className="flex gap-4 cursor-pointer">
      <AiOutlineEye className="hover:text-gray-600" />
      <AiOutlineEdit className="hover:text-gray-600" />
      <AiOutlineDelete className="hover:text-gray-600" />
    </div>
  </article>
);

const EventsTable = () => {
  return (
    <div className="flex flex-col justify-center bg-white font-text px-[2em] py-[1em] rounded-lg">
      <h1 className="border-b-2 font-bold text-lg pb-[0.8em]">All Events</h1>
      {EventsItem.map((item, index) => (
        <EventItem
          eventImg={item.eventImg}
          name={item.name}
          date={item.date}
          status={item.status}
          key={index}
        />
      ))}
    </div>
  );
};

export default EventsTable;
