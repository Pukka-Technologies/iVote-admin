/* eslint-disable @next/next/no-img-element */
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

import { FiList } from "react-icons/fi";
import ContestantsData from "../../../utils/contestantsTable";


const ContestantData = ({ contestantImg, name, code }) => (
  <article className="flex justify-between items-center py-[1em] border-b-2">
    <div className="flex items-center gap-6 w-[20%]">
      <img src={contestantImg} className="w-14 h-14 rounded-full" alt="" />
      <div>
        <h3 className="font-bold">{name}</h3>
      </div>
    </div>
    <div className="text-gray-500">{code}</div>
    <div className="flex gap-4 cursor-pointer">
      <AiOutlineEye className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineEdit className="hover:text-gray-600 hover:scale-125" />
      <AiOutlineDelete className="hover:text-gray-600 hover:scale-125" />
    </div>
  </article>
);

const ContestantsList = () => {
  return (
    <div className="flex flex-col justify-center border-t border-gray-200 bg-white font-text px-[2em] py-[1em] my-6 rounded-lg">
      <div className="flex items-center justify-between border-b-2">
        <h1 className="font-bold text-lg pb-[0.8em]">Contestants</h1>
        {/* event selector */}
        <div className="flex items-center justify-center gap-x-3 w-96">
          <div className="flex items-center justify-center border-2 border-green-400 p-2 rounded-lg">
            <FiList className="text-black text-xl " />{" "}
          </div>
          {/* <EventSelector options={fetchedEvents} setCategory={setEvent} /> */}
        </div>
      </div>
      {ContestantsData.map((person, index) => (
        <ContestantData
          contestantImg={person.contestantImg}
          name={person.name}
          code={person.code}
          key={index}
        />
      ))}
    </div>
  );
};

export default ContestantsList;
