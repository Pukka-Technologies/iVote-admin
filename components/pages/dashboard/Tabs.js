import React from 'react'
import { MdOutlineEmojiEvents, MdPeopleOutline } from "react-icons/md";

const Tabs = () => {
  return (
    <section className="flex gap-x-6 py-[2em] font-text justify-center items-center">
      <article className="flex flex-col gap-3 shrink-0 bg-white flex-1 px-[2.5em] py-[1.3em] items-center rounded-lg ">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">12</p>
        <p className="text-center">Total Events</p>
      </article>
      <article className="flex flex-col gap-3 shrink-0 bg-white flex-1 px-[2.5em] py-[1.3em] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">9</p>
        <p className="text-center">Opened Events</p>
      </article>
      <article className="flex flex-col gap-3 shrink-0 bg-white flex-1 px-[2.5em] py-[1.3em] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">14</p>
        <p className="text-center">Upcoming Events</p>
      </article>
      <article className="flex flex-col gap-3 shrink-0 bg-white flex-1 px-[2.5em] py-[1.3em] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">5</p>
        <p className="text-center"> Closed Events</p>
      </article>
    </section>
  );
}

export default Tabs