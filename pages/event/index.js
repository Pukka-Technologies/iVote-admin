import { useEffect } from "react";
import  Form  from "./form";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import { useStateValue } from "../../context/StateProvider";
import { GET_SESSION_USER } from "../../utils/session";


const Event = () => {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchSession = async () => {
      const session_user = await GET_SESSION_USER();
      if (session_user) {
        dispatch({
          type: "SET_USER",
          user: session_user,
        });
      }
    };
    fetchSession();
    // console.log(user);
  }, []);
  return (
    <div className="flex h-screen">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <Navbar />
      <Form/>
      </div>
    </div>
  );
};

export default Event;
