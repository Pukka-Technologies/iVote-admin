import { MdOutlineEmojiEvents, MdPeopleOutline } from "react-icons/md";
import { AiOutlineAppstoreAdd, AiOutlineUsergroupAdd, AiOutlineHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { Contestants, Dashboard, Events } from "../components/pages";

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
    },
    {
      name: "Add Admins",
      icon: <AiOutlineUsergroupAdd />,
    }
  ]

export default Navigations