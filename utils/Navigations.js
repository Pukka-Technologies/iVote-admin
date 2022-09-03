import { AiOutlineAppstoreAdd, AiOutlineHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import { Contestants, Dashboard, Events } from "../components/pages";
import { MdOutlineEmojiEvents, MdPeopleOutline } from "react-icons/md";

import Admins from "../components/pages/admin";
import { FiSettings } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";

const Navigations = [
    {
        name: "Dashboard",
        icon: <AiOutlineHome />,
        component: <Dashboard />,
    },
    {
      name: "Events",
      icon: <MdOutlineEmojiEvents />,
        component: <Events  />,
    },
    {
      name: "Create Events",
      icon: <AiOutlineAppstoreAdd />,
        component: <Events create />,
    },
    {
      name: "Contestants",
      icon: <MdPeopleOutline />,
      component: <Contestants />
    },
    {
      name: "Add Contestants",
      icon: <AiOutlineUsergroupAdd />,
      component: <Contestants create />
    },
    {
      name: "Settings",
      icon: <FiSettings />,
    },
    {
      name: "Admins",
      icon: <RiAdminLine />,
      component: <Admins />
    },
    {
      name: "Add Admins",
      icon: <AiOutlineUsergroupAdd />,
      component: <Admins create />
    }
  ]

export default Navigations