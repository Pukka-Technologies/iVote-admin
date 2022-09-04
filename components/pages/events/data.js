/* eslint-disable @next/next/no-img-element */

import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { getEventStatus, getEventsByType } from "../../../utils";

import { Empty, Fetching } from "../../Promises";
import { EventTypeSelector } from "../../EventSelector";
import Image from "next/image";
import { useStateValue } from "../../../context/StateProvider";
import { FiSearch } from "react-icons/fi";

const EventItem = ({ event }) => {
  const { name, imageURL, opening_date, closing_date, createdAt } = event;
  const formate_date = (date) => {
    const new_date = new Date(date);
    return new_date.toDateString();
  };
  const status = getEventStatus(opening_date, closing_date);
  return (
    <article className="flex justify-between items-center py-[1em] border-b-2 ">
      <div className="flex items-center gap-6  w-[35%]">
        <div className="relative w-32 h-16 border border-gray-200 rounded-md">
          <Image
            src={imageURL}
            className="rounded-md"
            alt="image"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="w-full">
          <h3 className="font-bold">{name}</h3>
          <p className="text-xs text-gray-400">
            Created at: {formate_date(createdAt)}
          </p>
        </div>
      </div>
      <div className="w-[45%] flex items-center justify-center gap-x-4">
        <div className="text-gray-500 flex flex-1 items-center justify-center">
          {formate_date(opening_date)}
        </div>
        <div
          className={`${status == "ongoing" && "text-green-600 bg-green-200"}
      ${status == "closed" && "text-red-600 bg-red-200"}
      ${status == "upcoming" && "text-yellow-600 bg-yellow-200"}
      flex px-2 py-1 rounded-sm items-center justify-center text-xs`}
        >
          {status}
        </div>
        <div className="text-gray-500 flex flex-1 items-center justify-center">
          {formate_date(closing_date)}
        </div>
      </div>
      <div className="flex gap-4 cursor-pointer w-[10%] items-end justify-end">
        <AiOutlineEye className="hover:text-gray-600 hover:scale-125" />
        <AiOutlineEdit className="hover:text-gray-600 hover:scale-125" />
        <AiOutlineDelete className="hover:text-gray-600 hover:scale-125" />
      </div>
    </article>
  );
};

const EventsList = ({ type = "all", showSelector = true }) => {
  const [{ events }, dispatch] = useStateValue();
  const [selectedType, setSelectedType] = useState(type);
  const [filteredEvents, setFilteredEvents] = useState(
    getEventsByType(events, type)
  );

  const handleChangeType = (type) => {
    setSelectedType(type);
    setFilteredEvents(getEventsByType(events, type));
  };

  return (
    <div className="flex flex-col min-h-[85vh] bg-white font-text mt-6 px-[2em] py-[1em] rounded-lg">
      <div className="w-full flex item-center justify-between py-3 px-5 border-b-2">
        <h1 className="font-bold text-lg pb-[0.8em] ">{selectedType} Events ({filteredEvents.length})</h1>
        <div className="w-[40%] flex items-center justify-center border border-gray-300 rounded-lg px-4 focus:outline-none focus:border-gray-400">
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none w-full"
            onChange={(e) => {
              const value = e.target.value;
              setFilteredEvents(
                getEventsByType(events, selectedType).filter((event) =>
                  event.name.toLowerCase().includes(value.toLowerCase())
                )
              );
            }}
          />
          <FiSearch className="" />
        </div>
        {showSelector && <EventTypeSelector onChange={handleChangeType} />}
      </div>

      {events &&
        filteredEvents
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((event) => {
            return <EventItem key={event._id} event={event} />;
          })}
      {filteredEvents.length == 0 && (
        <Empty text="No Records found" />
      )}
      {events && events.length == 0 && <Fetching text={"Fetching records......"} />}
    </div>
  );
};

export default EventsList;
