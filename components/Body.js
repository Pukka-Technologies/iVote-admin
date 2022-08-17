import React from 'react'
import EventsTable from './EventsTable';
import Navbar from './Navbar'
import Tabs from './Tabs'

const Body = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <Tabs />
        <EventsTable />
      </div>
    </>
  );
}

export default Body