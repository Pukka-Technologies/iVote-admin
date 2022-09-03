import { RiSearch2Line } from "react-icons/ri";
import { FaBlog } from "react-icons/fa";
import Link from "next/link";
const SearchBar  = () => {
    return (
      <div className="flex w-96 justify-between items-center gap-x-1">
        <div className="bg-[#e8ecf1] h-10 w-[90%] rounded-full flex items-center px-2 gap-2 ">
          <RiSearch2Line className="text-lg text-active cursor-pointer" />
          <input
            type="search"
            name="search"
            id="search"
            autoComplete="off"
            placeholder="search here..."
            className="bg-transparent text-base focus:outline-none border-0 w-[90%] placeholder:text-active text-active"
          />
        </div>
        {/* <FaBlog className="text-xl text-active cursor-pointer"  /> */}
      </div>
    );
  };

export default SearchBar;
