import React from 'react'
import Image from "next/image";
import adminImg from "../public/assets/admin.jpg"


const Navbar = () => {
  return (
    <div className='flex font-text pt-6 justify-end pr-[2em]'>
        <div className='flex items-center gap-3'>
            <div className='text-right'>
                <h3 className='font-extrabold'>Akosua D</h3>
                <p>Administrator</p>
            </div>
            <div>
                <Image src={adminImg} className="rounded-full" width={50} height={50}/>
            </div>
        </div>
    </div>
  )
}

export default Navbar