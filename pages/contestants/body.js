import React, { useState } from 'react'
import ImageBox from './imageBox';
import Selector from './selector';
import Uploader from './uploader';

const ConBody = () => {
  const [image, setImage] = useState(null)
  return (
    <section className="bg-gray-100 min-h-[86vh] flex justify-center items-center font-text">
      <div className="flex items-center w-full justify-center gap-x-20">
        {
          image? <ImageBox setImage={setImage} imageURI = {image} /> :<Uploader setImage={setImage} />
        }
        <article className='w-[50%] flex flex-col  justify-center gap-y-2'>
          <Selector />
          <div className="pt-5">
            <input
              type="text"
              placeholder="Contestant Name"
              className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
            />
          </div>
          <div className="pt-5">
            <input
              type="text"
              placeholder="Contestant Code"
              className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
            />
          </div>
          <div className='pt-5'>
            <button className="bg-green-200 w-full py-[0.6rem] hover:bg-green-300">Save</button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ConBody