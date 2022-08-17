import React from 'react'
import { MdOutlineEmojiEvents, MdPeopleOutline } from "react-icons/md";

const Tabs = () => {
  return (
    <section className="flex gap-8 pl-[2em] py-[2em] font-text flex-grow-0">
      <article className="flex flex-col gap-3 bg-white px-[4.5em] py-[1rem] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">10</p>
        <p>Total Events</p>
      </article>
      <article className="flex flex-col gap-3 bg-white px-[4.5em] py-[1em] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">10</p>
        <p>Opened Events</p>
      </article>
      <article className="flex flex-col gap-3 bg-white px-[4.5em] py-[1em] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">10</p>
        <p>Upcoming Events</p>
      </article>
      <article className="flex flex-col gap-3 bg-white px-[4.5em] py-[1em] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">10</p>
        <p> Closed Events</p>
      </article>
    </section>
  );
}

export default Tabs