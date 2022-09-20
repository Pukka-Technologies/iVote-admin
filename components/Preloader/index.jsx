import React from 'react'
import {TbLoader} from 'react-icons/tb'

const Preloader = () => {
  return (
    <div className='text-green-500 text-xl w-screen h-screen bg-gray-100 justify-center items-center flex gap-x-5'>
        <TbLoader className='animate-spin-slow text-3xl' />
        Loading
    </div>
  )
}

export default Preloader