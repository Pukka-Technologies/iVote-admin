import Login from "../components/Login.js";
import Main from "../components/Main/";


import { useStateValue } from "../context/StateProvider.js";
export default function Home() {
  const [{ user }, dispatch] = useStateValue();

  if (!user)
  {
    return <Login />
  }

  return <Main />;
}
