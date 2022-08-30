import React, { useState } from 'react'
import ImageBox from './imageBox';
import Selector from './selector';
import Uploader from './uploader';

const ConBody = () => {
  const [image, setImage] = useState(null)
  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center font-text">
      <div className="flex items-center w-full justify-center gap-20">
        {
          !image? <ImageBox /> :<Uploader />
        }
        <article className='basis-[30%]'>
          <Selector />
          <div className="pt-5">
            <input
              type="text"
              placeholder="Contestant Name"
              className="p-2 w-full rounded-md focus:border-none focus:outline-green-400"
            />
          </div>
          <div className="pt-5">
            <input
              type="text"
              placeholder="Contestant Code"
              className="p-2 w-full rounded-md focus:border-none focus:outline-green-400"
            />
          </div>
          <div className='pt-5'>
            <button className="bg-green-200 w-full rounded-md py-[0.4rem]">Save</button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ConBody