import React, { useEffect } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { generateLeaderboard } from "../../../utils";
import Axios from "../../../utils/axios";
import EventSelector from "../../EventSelector";

const Leaderboard = () => {
  const [{ votes, contestants }, dispatch] = useStateValue();
  const [event, setEvent] = React.useState(null);
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [totalVotes, setTotalVotes] = React.useState(0);

  const fetchLeaderboard = (params, callback) => {
    const {event_id} = params
    const year = new Date().getFullYear();
    const event_votes = votes.filter(vote => vote.event_id == event_id && vote.year == year)
    const event_contestants = contestants.filter(contestant => contestant.event_id == event_id && contestant.year == year)

    // generate leaderboard for contestants in event
    const {leaderboard, total_votes_cast} = generateLeaderboard(event_contestants, event_votes)
    setLeaderboard(leaderboard)
    setTotalVotes(total_votes_cast)
    console.log("leaderboard", leaderboard)
    console.log("total_votes_cast", total_votes_cast)

  };

  const handleEventChange = async (event) => {
    setEvent(event);
    fetchLeaderboard({ event_id: event }, setLeaderboard);
  };


  return (
    <div className="flex flex-col border-t border-gray-200 bg-white font-text px-[2em] py-[1em] my-6 rounded-lg min-h-full">
      <div className="flex items-center justify-end border-b-2">
        {/* event selector */}
        <div className="flex items-center justify-center ">
          <EventSelector setCategory={handleEventChange} />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
