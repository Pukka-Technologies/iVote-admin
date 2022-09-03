import { GET_SESSION_USER } from "../utils/session.js";
import Login from "../components/Login.js";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider.js";
import Root from "../components/Root";

const Admin = ({ component }) => {
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
  }, []);

  return !user ? <Login /> : <Root />;
};

export default Admin;
