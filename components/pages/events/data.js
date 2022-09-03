/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useStateValue } from "../../../context/StateProvider";
import EventsItem from "../../../utils/eventsTable";

const EventItem = ({ eventImg, name, date, status }) => (
  <article className="flex justify-between items-center py-[1em] border-b-2 ">
    <div className="flex items-center gap-6 flex-1">
      <img src={eventImg} className="w-24 h-16 rounded-md" alt="image" />
      <div className="w-full">
        <h3 className="font-bold">{name}</h3>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
    <div className="text-gray-500 flex flex-1 items-center justify-center">{status}</div>
    <div className="flex gap-4 cursor-pointer flex-1 items-end justify-end">
      <AiOutlineEye className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineEdit className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineDelete className="hover:text-gray-600 hover:scale-125" />
    </div>
  </article>
);

const EventsList = () => {

  const [{events}, dispatch] = useStateValue()

  
  // stat <today > end == opened
  //  start > today

  // const

  return (
    <div className="flex flex-col justify-center bg-white font-text mb-4 mt-6 px-[2em] py-[1em] rounded-lg">
      <h1 className="border-b-2 font-bold text-lg pb-[0.8em]">All Events</h1>
      {events && events.map((item, index) => (
        <EventItem
          eventImg={item.imageURL}
          name={item.name}
          date={item.open_date}
          status={0}
          key={index}
        />
      ))}
    </div>
  );
};

export default EventsList;
