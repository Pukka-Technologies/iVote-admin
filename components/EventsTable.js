import React from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import EventsItem from "../utils/eventsTable";

const EventItem = ({ eventImg, name, date, status }) => (
  <article className="flex justify-between items-center py-[1em] border-b-2 ">
    <div className="flex gap-6 w-[20%]">
      <img src={eventImg} className="w-10 h-10 rounded-md" />
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
    <div className="text-gray-500">{status}</div>
    <div className="flex gap-4 cursor-pointer">
      <AiOutlineEye />
      <AiOutlineEdit />
      <AiOutlineDelete />
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
