import { GET_SESSION_USER } from "../utils/session.js";
import Login from "../components/Login.js";
import Root from "../components/Root/index.js";
import { fetchData, fetchSession, getAllAdmins } from "../utils/index.js";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider.js";
import Axios from "../utils/axios.js";

const Admin = () => {
  const [{ user }, dispatch] = useStateValue();

  // const fetchSession = async () => {
  //   const session_user = await GET_SESSION_USER();
  //   if (session_user) {
  //     dispatch({
  //       type: "SET_USER",
  //       user: session_user,
  //     });
  //   }
  // };



  useEffect(() => {
    fetchSession(dispatch);
  }, [])
  
  // useEffect(() => {
  // }, [user])
  

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

     
    // setInterval(fetchSession, )
  }, []);

  return !user ? <Login /> : <Root />;
};

export default Admin;
