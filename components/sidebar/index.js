import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { LOGOUT } from "../../utils";
import { useStateValue } from "../../context/StateProvider";
import Navigations from "../../utils/Navigations";
import { useRouter } from "next/router";

const SideBar = ({ page, setComponent, setPage }) => {

  const router = useRouter()

  const [{}, dispatch] = useStateValue();
  const navigate = (name, index) => {
    setPage(name)
    setComponent(Navigations[index].component)
  }
  return (
    <section className="w-[20%] flex flex-col items-center gap-y-5 font-text p-5 shadow-sm">
      {/*logo*/}
      <div className="w-full flex items-center justify-center mb-5">
        <h1 className="font-bold text-[1.3em] text-center">Media Billo</h1>
      </div>
      <ul className="gap-3 flex flex-col">
        {Navigations.map((nav, index) => (
          <li
            key={index}
            className={`flex gap-3 items-center ${
              page == nav.name && "bg-green-200"
            } cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]`}
            onClick={() => navigate(nav.name, index)}
          >
            {nav.icon}
            <span>{nav.name}</span>
          </li>
        ))}
        <li
          onClick={() => LOGOUT(dispatch)}
          className="flex gap-3 items-center cursor-pointer w-[14em] py-[0.5em] rounded-xl pl-[1em]"
        >
          <BiLogOutCircle />
          <span>Log out</span>
        </li>
      </ul>
    </section>
  );
};

export default SideBar;
