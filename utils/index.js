import Axios from "./axios";
import { toast } from "react-toastify";

export const LOGOUT = async (dispatch) => {
  try {
    const { data } = await Axios({
      url: "logout",
      method: "GET",
    });
    if (data.success) {
      dispatch({
        type: "SET_USER",
        user: null,
      });
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const fetchData = async (route, callback) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: route,
    });

    callback(data);
  } catch (error) {
    console.log(error);
  }
};
export const getAllVotes = async (token, callback) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: "vote",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdmins = async (token, dispatch) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: "admin",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "SET_ADMINS",
      admins: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSession = async (token, callback) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: "refresh",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(data)
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchSession = async (dispatch) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: "refresh",
    });

    dispatch({
      type: "SET_USER",
      user: data.admin,
    });
    console.log("user persists 🏆");
  } catch (e) {
    console.log(e);
  }
};

export const addContestant = async (contestant, token) => {
  try {
    const { data } = await Axios({
      method: "POST",
      url: "contestant",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: contestant,
    });

    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    // toast.error(error.response.data.message)
  }
};
export const addEvent = async (event, token) => {
  try {
    const { data } = await Axios({
      method: "POST",
      url: "event",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: event,
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
    // toast.error(error.response.data.message)
  }
};
export const addAdmin = async (admin, token) => {
  try {
    const { data } = await Axios({
      method: "POST",
      url: "admin",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: admin,
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
    // toast.error(error.response.data.message)
  }
};

export const fetchContestants = async (callback) => {
  try {
    const { data } = await Axios({
      method: "GET",
      url: "contestant",
    });

    if (data.success) {
      // console.log(data.data)
      callback(data.data);
      // return data.data
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getEventStatus = (opening_date, closing_date) => {
  const today = new Date();
  const start = new Date(opening_date);
  const end = new Date(closing_date);
  let status = "";
  if (today < start) {
    status = "upcoming";
  } else if (today > end) {
    status = "closed";
  } else {
    status = "ongoing";
  }
  return status;
};

export const getEventsByType = (events, type) => {
  if (type === "all") {
    return events;
  }
  return events.filter(
    (event) => getEventStatus(event.opening_date, event.closing_date) === type
  );
};

export const dateFormater = (date) => {
  const new_date = new Date(date);
  return new_date.toDateString();
};

export const editEvent = async (id, token, update) => {
  try {
    const { data } = await Axios({
      method: "PUT",
      url: `event/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: update,
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    // toast.error(error.response.data.message)
  }
};

export const editContestant = async (id, token, update) => {
  try {
    const { data } = await Axios({
      method: "PUT",
      url: `contestant/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: update,
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    // toast.error(error.response.data.message)
  }
};

export const changePassword = async (token, update) => {
  try {
    const { data } = await Axios({
      method: "PATCH",
      url: `admin/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: update,
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "An error occured", {
      position: "top-center",
      toastId: "passwordChanged",
    });
  }
};

export const Delete = async (token, route, id, callback) => {
  try {
    const { data } = await Axios({
      method: "DELETE",
      url: `${route}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    if (data.success) {
      callback(data.data);
    } else {
      toast.error("Sorry, an error occured", {
        position: "top-center",
        toastId: "delete",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "An error occured", {
      position: "top-center",
    });
  }
};

export const getEventById = async (id, events) => {
  return events.find((event) => event._id == id);
};

export const getContestantVotes = (votes, id) => {
  const items = votes.filter((vote) => vote.contestant_id == id);
  let total = 0;
  items.forEach((item) => {
    total += item.total_votes;
  });
  return total;
};

export const generateLeaderboard = (contestants, votes) => {
  const updatedContestants = contestants.map((contestant) => {
    const {online_votes, offline_votes} = getContestantTotalVotes(votes, contestant._id);
    // remove votes from contestant
    let total_votes = online_votes + offline_votes;
    delete contestant.votes;
    return { ...contestant, total_votes, online_votes, offline_votes };
  });
  return {
    leaderboard: updatedContestants,
    total_votes_cast: updatedContestants.reduce(
      (total, contestant) => total + contestant.total_votes,
      0
    ),
  };
};

// calculate total votes for each contestant from votes array
export const getContestantTotalVotes = (votes, id) => {
  const items = votes.filter((vote) => vote.contestant_id == id);
  let online_votes = 0;
  let offline_votes = 0;
  items.forEach((item) => {
    if(item.type == "online"){
      online_votes += item.total_votes;
    }else{
      offline_votes += item.total_votes;
    }
  })
  return {online_votes, offline_votes};
}

export const ManualVote = async (token, voteData, callback) => {
  if (!token) {
    toast.error("You are not logged in", {
      position: "top-center",
      toastId: "manualVote",
    });
    return;
  }
  try {
    const { data } = await Axios({
      method: "POST",
      url: `vote/manual`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: voteData,
    });

    console.log(data);
    callback(data);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "An error occured", {
      position: "top-center",
    });
  }
};

export const evictContestant = async (token, data, callback) => {
  const {id, status} = data;
  console.log("evicting contestant", data);
  if (!token) {
    toast.error("You are not logged in", {
      position: "top-center",
      toastId: "evictContestant",
    });
    return;
  }
  try {
    const { data } = await Axios({
      method: "PUT",
      url: `contestant/evict/${id}?status=${status}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });

    console.log(data);
    callback(data);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "An error occured", {
      position: "top-center",
      toastId: "evictContestant",
    });
  }
}