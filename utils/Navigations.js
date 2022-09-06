import {
  AiOutlineAppstoreAdd,
  AiOutlineHome,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { Contestants, Dashboard, Events } from "../components/pages";
import { MdOutlineEmojiEvents, MdPeopleOutline } from "react-icons/md";

import Admins from "../components/pages/admin";
import { FiSettings } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import Settings from "../components/pages/settings";

const Navigations = [
  {
    name: "Dashboard",
    icon: <AiOutlineHome />,
    component: <Dashboard />,
    protected: false,
  },
  {
    name: "Events",
    icon: <MdOutlineEmojiEvents />,
    component: <Events />,
    protected: false,
  },

  {
    name: "Create Events",
    icon: <AiOutlineAppstoreAdd />,
    component: <Events create />,
    protected: false,
  },
  {
    name: "Contestants",
    icon: <MdPeopleOutline />,
    component: <Contestants />,
    protected: false,
  },
  {
    name: "Add Contestants",
    icon: <AiOutlineUsergroupAdd />,
    component: <Contestants create />,
    protected: false,
  },
  {
    name: "Settings",
    icon: <FiSettings />,
    component: <Settings />,
    protected: false,
  },
  {
    name: "Admins",
    icon: <RiAdminLine />,
    component: <Admins />,
    protected: true,
  },
  {
    name: "Add Admins",
    icon: <AiOutlineUsergroupAdd />,
    component: <Admins create />,
    protected: true,
  },
];

export default Navigations;
