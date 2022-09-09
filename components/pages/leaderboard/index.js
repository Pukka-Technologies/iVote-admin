/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { generateLeaderboard } from "../../../utils";
import { BsGraphUp } from "react-icons/bs";
import EventSelector from "../../EventSelector";
import { Empty } from "../../Promises";
import LeaderboardChart from "./Leaderboard";

const Leaderboard = () => {
  const [{ votes, contestants, events }, dispatch] = useStateValue();
  const [event, setEvent] = React.useState(null);
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [totalVotes, setTotalVotes] = React.useState(0);

  const fetchLeaderboard = (params) => {
    const { event_id } = params;
    const year = new Date().getFullYear();
    const event_votes = votes.filter(
      (vote) => vote.event_id == event_id && vote.year == year
    );
    const event_contestants = contestants.filter(
      (contestant) => contestant.event_id == event_id && contestant.year == year
    );
    // generate leaderboard for contestants in event
    const { leaderboard, total_votes_cast } = generateLeaderboard(
      event_contestants,
      event_votes
    );
    setLeaderboard(leaderboard);
    setTotalVotes(total_votes_cast);
  };

  const handleEventChange = async (event) => {
    setEvent(event);
    fetchLeaderboard({ event_id: event });
  };

  return (
    <div className="flex flex-col border-t border-gray-200 bg-white font-text px-[2em] py-[1em] my-6 rounded-lg min-h-[full]">
      <div className="flex items-center justify-between border-b-2">
        <div className="flex items-center  justify-between">
          <h3 className="text-2xl font-bold flex gap-x-3">
            Leaderboard <BsGraphUp className="text-green-400" />{" "}
          </h3>
        </div>
        <p className="text-gray-600">Total Votes: {totalVotes}</p>
        <p className="text-gray-600">Amount: GHC {
            (events.find((e) => e.id == event)?.vote_price || 1) * totalVotes
        }</p>
        {/* event selector */}
        <div className="flex items-center justify-center ">
          <EventSelector setCategory={handleEventChange} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {leaderboard.length > 0 && (
          <LeaderboardChart leaderboard={leaderboard} />
        )}
        {!leaderboard.length && (
          <Empty
            text={"No votes cast yet! Select Event to show leaderboard."}
          />
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
