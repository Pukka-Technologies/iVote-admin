import React from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const eventImg = "/assets/events.jpg";

const EventsTable = () => {
  return (
    <div className="bg-white font-text mx-[5em]  px-[2em] py-[1em] rounded-lg">
      <h1 className="border-b-2 font-bold text-lg">All Events</h1>
      <article className="flex justify-between py-[1em] border-b-2 ">
        <div className="flex gap-6">
          <img src={eventImg} className="w-10 h-10 rounded-md" />
          <div>
            <h3 className="font-bold">Miss Agriculture</h3>
            <p className="text-xs text-gray-400">14 April, 2022</p>
          </div>
        </div>
        <div className="text-gray-500">Closed</div>
        <div className="flex gap-4 cursor-pointer">
          <AiOutlineEye />
          <AiOutlineEdit />
          <AiOutlineDelete />
        </div>
      </article>

      <article className="flex justify-between py-[1em] border-b-2 ">
        <div className="flex gap-6">
          <img src={eventImg} className="w-10 h-10 rounded-md" />
          <div>
            <h3 className="font-bold">Miss Agriculture</h3>
            <p className="text-xs text-gray-400">14 April, 2022</p>
          </div>
        </div>
        <div className="text-gray-500">Closed</div>
        <div className="flex gap-4 cursor-pointer">
          <AiOutlineEye />
          <AiOutlineEdit />
          <AiOutlineDelete />
        </div>
      </article>

      <article className="flex justify-between py-[1em] border-b-2 ">
        <div className="flex gap-6">
          <img src={eventImg} className="w-10 h-10 rounded-md" />
          <div>
            <h3 className="font-bold">Miss Agriculture</h3>
            <p className="text-xs text-gray-400">14 April, 2022</p>
          </div>
        </div>
        <div className="text-gray-500">Closed</div>
        <div className="flex gap-4 cursor-pointer">
          <AiOutlineEye />
          <AiOutlineEdit />
          <AiOutlineDelete />
        </div>
      </article>

      <article className="flex justify-between py-[1em] border-b-2 ">
        <div className="flex gap-6">
          <img src={eventImg} className="w-10 h-10 rounded-md" />
          <div>
            <h3 className="font-bold">Miss Agriculture</h3>
            <p className="text-xs text-gray-400">14 April, 2022</p>
          </div>
        </div>
        <div className="text-gray-500">Closed</div>
        <div className="flex gap-4 cursor-pointer">
          <AiOutlineEye />
          <AiOutlineEdit />
          <AiOutlineDelete />
        </div>
      </article>

      
    </div>
  );
};

export default EventsTable;
