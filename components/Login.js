import { useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { validateEmail } from "../utils/Validators";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  // form handler
  const formHandler = () => {
    // validate form
    if(credentials.email === "" || credentials.password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    if(!validateEmail(credentials.email))
    {
      toast.error("Please enter a valid email");
      return;
    }
    // send credentials to server
    toast.success("Login successful");  


    // if valid, dispatch action to set user
    // if not valid, show error message

  };
  return (
    <main className="flex flex-col items-center justify-center bg-green-100 h-screen font-text">
      <RiAdminLine className="text-9xl bg-green-400 rounded-full p-5 text-white mb-[0.4em]" />
      <form className="w-[22em] justify-center flex flex-col">
        <input
          className="h-[3em] px-[1em] border-none focus:outline-green-400"
          placeholder="USERNAME"
          type="text"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
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
          className="my-[0.5em] bg-green-400 px-[1em] py-[0.6em] text-white"
          type="button"
          onClick={formHandler}
        >
          LOGIN
        </button>
        <p className="text-right text-gray-500 underline">Forgot password?</p>
      </form>
    </main>
  );
};

export default Login;
