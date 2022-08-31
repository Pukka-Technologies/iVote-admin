import React from "react";
import { MdCloudUpload, MdOutlineDataSaverOn } from "react-icons/md";


const   Form = () => {
  return (
    <div className="px-[3.4em] bg-gray-100 min-h-screen overflow-x-hidden box-border font-text">
      <div className="min-h-screen overflow-x-hidden  my-3">
        <div className=" min-h-screen overflow-x-hidden  box-border border-2 border-dotted pt-3 border-gray-300">
          <div className="h-[26rem] overflow-x-hidden mx-3 box-border flex items-center justify-center border-2 border-dotted border-gray-300">
            <label
              htmlFor="file-upload"
              className="flex flex-col justify-center items-center w-full h-full rounded-lg  cursor-pointer"
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6 gap-2">
                <MdCloudUpload className="text-gray-500 text-3xl " />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click here to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="file-upload"
                name="uploadimage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => uploadImage(e)}
              />
            </label>
          </div>
          <div className="mt-10">
            <div className="flex flex-row items-center  justify-start mx-3 mt-5  gap-3 pb-2">
              <div className="flex flex-row items-center  justify-start mt-5 bg-white  w-full gap-3   border-none ">
                <input
                  type="text"
                  placeholder="NAME OF EVENT"
                  className="text-gray-500  bg-transparent pl-2   h-[3em]  focus:outline-green-400   w-full outline-none"
                />
              </div>

              <div className="flex flex-row items-center  justify-start mt-5 bg-white  w-full gap-3   border-none ">
                <input
                  type="text"
                  placeholder="EVENT DESCRIPTION"
                  className="text-gray-500  bg-transparent pl-2   h-[3em]  focus:outline-green-400   w-full outline-none"
                />
              </div>
            </div>
            <div className="flex flex-row items-center  justify-start mx-3 mt-5  gap-3 pb-2">
              <div className="flex flex-row items-center  justify-start mt-5 bg-white  w-full gap-3   border-none ">
                <input
                  type="date"
                  placeholder="Open Date"
                  className="text-gray-500  bg-transparent pl-2   h-[3em]  focus:outline-green-400   w-full outline-none"
                />
              </div>

              <div className="flex flex-row items-center  justify-start mt-5 bg-white  w-full gap-3   border-none ">
                <input
                  type="date"
                  placeholder="Close Date"
                  className="text-gray-500  bg-transparent pl-2   h-[3em]  focus:outline-green-400   w-full outline-none"
                />
              </div>
            </div>
    
           
          </div>
          <div className="flex flex-row items-center my-3 mx-3 justify-end">
            <li className=" bg-green-400 px-[1em] py-[0.6em] flex  items-center justify-center gap-2  flex-row list-none">
              <button className="font-medium text-black cursor-pointer ">
                SAVE
              </button>
              <MdOutlineDataSaverOn />
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
