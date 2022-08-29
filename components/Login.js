import { useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useStateValue } from "../context/StateProvider";
import Axios from "../utils/axios";
import {ImSpinner3} from "react-icons/im"
const Login = () => {
  const [{}, dispatch] = useStateValue()
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // form handler
  const formHandler = async () => {

    // validate form
    if(credentials.username === "" || credentials.password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const {data} = await Axios({
        url: "admin/login",
        method: "POST",
        data: credentials,
      })
  
      dispatch({
        type: "SET_USER",
        user: data.admin
      })
      setLoading(false);
      toast.success("Login successful");  
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }

  };
  return (
    <main className="flex flex-col items-center justify-center bg-green-100 h-screen font-text">
      <RiAdminLine className="text-9xl bg-green-400 rounded-full p-5 text-white mb-[0.4em]" />
      <form className="w-[22em] justify-center flex flex-col" onSubmit={formHandler} >
        <input
          className="h-[3em] px-[1em] border-none focus:outline-green-400"
          placeholder="USERNAME"
          type="text"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        ></input>
        <br></br>
        <input
          type="password"
          className="h-[3em] px-[1em] focus:outline-green-400"
          placeholder="PASSWORD"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        ></input>
        <br></br>
        <button
          className="my-[0.5em] bg-green-400 px-[1em] py-[0.6em] text-white flex items-center justify-center gap-x-3"
          type="button"
          onClick={formHandler}
          disabled={loading}
        >
          {/* loading icon */}
          {loading && <ImSpinner3 className="animate-spin" />}
          {loading ? "Authenticating..." : "LOGIN"}	
        </button>
        <p className="text-right text-gray-500 underline">Forgot password?</p>
      </form>
    </main>
  );
};

export default Login;
