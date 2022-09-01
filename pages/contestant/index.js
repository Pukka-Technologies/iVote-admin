import Body from "./body";
import { GET_SESSION_USER } from "../../utils/session";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import { useEffect } from "react";
import { useStateValue } from "../../context/StateProvider.js";

const Contestants = () => {
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
    console.log(user);
  }, []);
  return (
    <div className="flex h-screen">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <Navbar />
        <Body />
      </div>
    </div>
  );
};

export default Contestants;
