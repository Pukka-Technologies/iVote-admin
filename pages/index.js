import { GET_SESSION_USER } from "../utils/session.js";
import Login from "../components/Login.js";
import Root from "../components/Root/index.js";
import {
  fetchData,
  fetchSession,
  getAllAdmins,
  getAllVotes,
} from "../utils/index.js";
import { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider.js";
import Preloader from "../components/Preloader.jsx";

const Admin = () => {
  const [{ user }, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSession(dispatch);
  }, []);

  useEffect(() => {
    fetchData("event", async (data) => {
      if (data.success) {
        // console.log(data.data)
        dispatch({
          type: "SET_EVENTS",
          events: data.data,
        });

        console.log("events", data.data);
        // return data.data
      } else {
        console.log(data);
      }
    });

    fetchData("contestant", async (data) => {
      if (data.success) {
        // console.log(data.data)
        dispatch({
          type: "SET_CONTESTANTS",
          contestants: data.data,
        });

        console.log("contestants", data.data);
        // return data.data
      } else {
        console.log(data);
      }
    });

  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
}, []);

  if(loading) return <Preloader />

  return !user ? <Login /> : <Root />;
};

export default Admin;


 
