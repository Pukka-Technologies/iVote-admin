import React, { useState } from 'react'
import { useStateValue } from '../../context/StateProvider';
import { addContestant, fetchEvents } from '../../utils';
import ImageBox from './imageBox';
import Selector from './selector';
import Uploader from './uploader';
import { toast } from "react-toastify"
const Body = () => {
  const [imageURI, setImageURI] = useState(null);
  const [image, setImage] = useState(null);
  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const [{ user }, dispatch] = useStateValue()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!image || !imageURI){
      toast.error("Add contestant image")
      return
    }

    if(!name || !code || !event){
      toast.error("Make sure all fields are filled")
      return
    }

    console.log({
      imageURI, event, name, code
    });

    const contestant = new FormData();
    contestant.append("name", name);
    contestant.append("event_id", event);
    contestant.append("contestant_code", code);
    contestant.append("imageURI", imageURI);

     await addContestant(contestant, user.access_token)

    toast.success("Event added successfully")
  }
  

  return (
    <section className="bg-gray-100 min-h-[86vh] flex justify-center items-center font-text">
      <form className="flex items-center w-full justify-center gap-x-20" encType='multipart/form-data'>
        {
          image? <ImageBox setImage={setImage} imageURI = {image} /> :<Uploader setImageURI={setImageURI} setImage={setImage} />
        }
        <article className='w-[50%] flex flex-col  justify-center gap-y-2'>
          <Selector setCategory={setEvent} />
          <div className="pt-5">
            <input
              type="text"
              placeholder="Contestant Name"
              className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="pt-5">
            <input
              type="text"
              placeholder="Contestant Code"
              className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />
          </div>
          <div className='pt-5'>
            <button onClick={handleSubmit} className="bg-green-200 w-full py-[0.6rem] hover:bg-green-300">Save</button>
          </div>
        </article>
      </form>
    </section>
  );
}

export default Body