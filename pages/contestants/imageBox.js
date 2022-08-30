import React from 'react'
import { MdDeleteForever } from 'react-icons/md';

const ImageBox = () => {
  return (
    <div className="flex flex-col justify-center items-center rounded-lg cursor-pointer border-2 border-dashed p-10 relative">
      <div className="w-48 h-48">
        <img
          src="https://codersquiz.netlify.app/img/bentil.jpeg"
          className="w-full h-full"
        />
      </div>
      <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full text-white absolute bottom-5 right-5">
        <MdDeleteForever />
      </div>
    </div>
  );
}

export default ImageBox