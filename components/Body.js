import React from 'react'
import Navbar from './Navbar'
import Tabs from './Tabs'

const Body = () => {
  return (
    <>
      <Navbar />
      <div className='bg-gray-100 h-full'>
        <Tabs />
      </div>
    </>
  );
}

export default Body