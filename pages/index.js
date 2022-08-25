import Login from "../components/Login.js";
import Main from "../components/Main/";


import { useStateValue } from "../context/StateProvider.js";
export default function Home() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <>  
      {!user ? <Login /> : <Main />}
    </>
  );
}
