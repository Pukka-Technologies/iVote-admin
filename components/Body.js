import React from 'react'
// import ContestantTable from './ContestantTable';
import EventsTable from './EventsTable';
import Navbar from './Navbar'
import Tabs from './Tabs'

const Body = () => {
  return (
    <>
      <Navbar />
      <div className="px-[3.4em] bg-gray-100 min-h-screen overflow-x-hidden box-border">
        <Tabs />
        <EventsTable/>
        {/* <ContestantTable/> */}
      </div>
    </>
  );
}

export default Body