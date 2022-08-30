import React from 'react'
import { MdCloudUpload } from "react-icons/md";
import Selector from './selector';

const ConBody = () => {
  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center font-text">
      <div className="flex items-center w-full justify-center gap-20">
        <article>
          <label
            htmlFor="file-upload"
            className="flex flex-col justify-center items-center rounded-lg cursor-pointer border-2 border-dashed p-10"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6 gap-2">
              <MdCloudUpload className="text-gray-500 text-3xl " />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click here to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG OR JPG (MAX. 400x400px)
              </p>
            </div>
            <input
              id="file-upload"
              name="uploadimage"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </article>
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