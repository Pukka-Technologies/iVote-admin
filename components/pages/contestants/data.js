/* eslint-disable @next/next/no-img-element */

import EventSelector from "../../EventSelector";
import { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { Empty, Fetching } from "../../Promises";
import ViewButton from "./viewModals";
import { FiSearch } from "react-icons/fi";
import EditButton from "./editModal";
import  { VoteButton, DeleteButton } from "./deleteModal";

const ContestantData = ({ data }) => {
  const { imageURL, name, contestant_code, event_id, votes } = data;
  const [{ events }, dispatch] = useStateValue();
  return (
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
        </div>{" "}
      </div>
      <div className="w-[40%]  flex items-center justify-between gap-x-4">
        <div className="text-gray-500 flex flex-1 items-center justify-start">
          {
            // event name
            events.find((event) => event._id == event_id)?.name
          }
        </div>
        <p>
          {votes}
        </p>
      </div>
      <div className="flex gap-4 cursor-pointer w-[10%] items-end justify-end">
        <VoteButton data={data} />
        <ViewButton data={data} />
        <EditButton data={data} />
        <DeleteButton data={data} />
      </div>
    </article>
  );
};

const ContestantsList = () => {
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [{ contestants, events }, dispatch] = useStateValue();
  const [filteredContestants, setFilteredContestants] = useState(contestants);
  const [availableEvents, setAvailableEvents] = useState(filteredContestants);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredContestants(
      availableEvents.filter((contestant) =>
        contestant.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleEventChange = (e) => {
    setSelectedEvent(e);
    if (e === "all") {
      setFilteredContestants(contestants);
      setAvailableEvents(contestants);
    } else {
      const filtered = contestants.filter(
        (contestant) => contestant.event_id === e
      );
      setFilteredContestants(filtered);
      setAvailableEvents(filtered);
    }
  };
  return (
    <div className="flex flex-col border-t border-gray-200 bg-white font-text px-[2em] py-[1em] my-6 rounded-lg min-h-full">
      <div className="flex items-center justify-between border-b-2">
        <h1 className="font-bold text-lg pb-[0.8em]">
          Contestants
          {selectedEvent !== "all" ? (
            <span className="text-xs text-gray-400 ml-3">
              ({events.find((event) => event._id == selectedEvent)?.name} -{" "}
              {filteredContestants.length})
            </span>
          ) : (
            <span className="text-xs text-gray-400 ml-3">
              {filteredContestants.length}
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
              onChange={handleSearch}
            />
            <FiSearch className="" />
          </div>
        }
        {/* event selector */}
        <div className="flex items-center justify-center ">
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

          return <ContestantData data={person} key={index} />;
        })}
      {contestants && filteredContestants.length == 0 && (
        <Empty text="No Contestants" />
      )}
      {!contestants && <Fetching text="Loading..." />}
    </div>
  );
};

export default ContestantsList;
