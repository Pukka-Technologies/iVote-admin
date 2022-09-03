/* eslint-disable @next/next/no-img-element */

import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

import ContestantsData from "../../../utils/contestantsTable";
import EventSelector from "../../EventSelector";
import { FiList, FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { Empty, Fetching } from "../../Promises";

const ContestantData = ({ imageURL, name, contestant_code, event }) => (
  <article className="flex justify-between items-center py-[1em] border-b-2">
    <div className="flex items-center gap-6  w-[35%]">
      {imageURL && (
        <img
          src={imageURL}
          className="w-16 h-16 rounded-full object-contain"
          alt="image"
        />
      )}
      <div className="">
        <h3 className="font-bold">{name}</h3>
        <p className="text-xs text-gray-400">
          Code:
          <span className="text-green-600 mx-2 font-bold">
            {contestant_code}
          </span>
        </p>
      </div>    </div>
    <div className="w-[45%] flex items-center justify-center gap-x-4">
      <div className="text-gray-500 flex flex-1 items-center justify-center">
        {event}
      </div>
      {/* <div className={`${status == "Opened"? 'text-green-600 bg-green-200':'text-red-600 bg-red-200'} flex px-2 py-1 rounded-sm items-center justify-center text-xs`}>
      {status}
    </div> */}
      {/* <div className="text-gray-500 flex flex-1 items-center justify-center">
      {closing_date}
    </div> */}
    </div>
    <div className="flex gap-4 cursor-pointer w-[10%] items-end justify-end">
      <AiOutlineEye className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineEdit className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineDelete className="hover:text-gray-600 hover:scale-125" />
    </div>
  </article>
);

const ContestantsList = () => {
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [{ contestants, events }, dispatch] = useStateValue();
  const [filteredContestants, setFilteredContestants] = useState(contestants);

  const handleEventChange = (e) => {
    setSelectedEvent(e);
    if (e === "all") {
      setFilteredContestants(contestants);
    } else {
      const filtered = contestants.filter(
        (contestant) => contestant.event_id === e
      );
      setFilteredContestants(filtered);
    }
  };
  return (
    <div className="flex flex-col border-t border-gray-200 bg-white font-text px-[2em] py-[1em] my-6 rounded-lg min-h-full">
      <div className="flex items-center justify-between border-b-2">
        <h1 className="font-bold text-lg pb-[0.8em]">
          Contestants
          {selectedEvent !== "all" && (
            <span className="text-xs text-gray-400 ml-3">
              ({events.find((event) => event._id == selectedEvent)?.name})
            </span>
          )}
        </h1>
        {
          // search bar
          <div className="w-[40%] -mt-2 flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-400">
            <input
              type="text"
              placeholder="Search"
              className="border-none outline-none w-full"
              onChange={(e) => {
                const filtered = contestants.filter((contestant) =>
                  contestant.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                );
                setFilteredContestants(filtered);
              }}
            />
             <FiSearch className="" />
          </div>
        }
        {/* event selector */}
        <div className="flex items-center justify-center ">
          {/* <div className="flex items-center justify-center border-2 border-green-400 p-2 rounded-lg">
            <FiList className="text-black text-xl " />{" "}
          </div> */}
          <EventSelector setCategory={handleEventChange} />
        </div>
      </div>
      {events &&
        contestants &&
        filteredContestants.map((person, index) => {
          // get event name from events by id
          const event = events.find(
            (event) => event._id == person.event_id
          ).name;

          return (
            <ContestantData
              imageURL={person.imageURL}
              name={person.name}
              contestant_code={person.contestant_code}
              event={event}
              key={index}
            />
          );
        })}
        {
          contestants && filteredContestants.length == 0 && <Empty text="No Contestants" />
        }
        {
          !contestants && <Fetching text="Loading..." />
        }
    </div>
  );
};

export default ContestantsList;
