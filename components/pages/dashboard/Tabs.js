import React from 'react'
import { MdOutlineEmojiEvents, MdPeopleOutline } from "react-icons/md";
import { useStateValue } from '../../../context/StateProvider';
import { getEventsByType } from '../../../utils';

const Tabs = () => {
  const [{events}, dispatch] = useStateValue()
  return (
    <section className="flex gap-x-6 py-[2em] font-text justify-center items-center">
      <article className="flex flex-col gap-3 shrink-0 bg-white flex-1 px-[2.5em] py-[1.3em] items-center rounded-lg ">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">{events.length || 0}</p>
        <p className="text-center">Total Events</p>
      </article>
      <article className="flex flex-col gap-3 shrink-0 bg-white flex-1 px-[2.5em] py-[1.3em] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">{getEventsByType(events, 'ongoing').length || 0}</p>
        <p className="text-center">Ongoing Events</p>
      </article>
      <article className="flex flex-col gap-3 shrink-0 bg-white flex-1 px-[2.5em] py-[1.3em] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">{getEventsByType(events, 'upcoming').length || 0}</p>
        <p className="text-center">Upcoming Events</p>
      </article>
      <article className="flex flex-col gap-3 shrink-0 bg-white flex-1 px-[2.5em] py-[1.3em] items-center rounded-lg">
        <div className="bg-green-200 p-3 rounded-lg">
          <MdOutlineEmojiEvents />
        </div>
        <p className="font-extrabold text-lg">{getEventsByType(events, 'closed').length || 0}</p>
        <p className="text-center"> Closed Events</p>
      </article>
    </section>
  );
}

export default Tabs