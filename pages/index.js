import { GET_SESSION_USER } from "../utils/session.js";
import Login from "../components/Login.js";
import Main from "../components/Main/";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider.js";

export default function Home() {
  const [{ user }, dispatch] = useStateValue()

useEffect(() => {
  const fetchSession = async () => {
      const session_user = await GET_SESSION_USER()
    if(session_user){
      dispatch({
        type: "SET_USER",
        user:session_user
      })
    }
  };
  fetchSession();
}, [])
  if (!user)
  {
    return <Login />
  }

  return <Main />;
}
