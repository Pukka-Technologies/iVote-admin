import React, { useState } from "react";
import { removeImage, uploadImage } from "../../../firebase";

import EventSelector from "../../EventSelector";
import { ImSpinner3 } from "react-icons/im";
import ImageUploader from "../../../components/ImageUploader";
import { addContestant } from "../../../utils";
import { toast } from "react-toastify";
import { useStateValue } from "../../../context/StateProvider";

const NewContestant = () => {
  
  const [imageURI, setImageURI] = useState(null);
  const [image, setImage] = useState(null);
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [{ user, events }, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!image || !imageURI) {
      toast.error("Add contestant image");
      setLoading(false);
      return;
    }

    if (!name || !code || !event) {
      toast.error("Make sure all fields are filled");
      setLoading(false);
      return;
    }
    
    await uploadImage(imageURI, "contestants", async(downloadURL) => {
      const contestant = {
        name, event_id: event, contestant_code:code, imageURL: downloadURL
      }
      try{
        const res = await addContestant(contestant, user?.access_token);
        if (res && res.success) {
          toast.success("Contestant added successfully");
          setLoading(false);
          return;
        }
        toast.error("Something went wrong");
        setLoading(false);
      }catch(err){
        // remove image from storage
        await removeImage(downloadURL);
        toast.error("Something went wrong");
        setLoading(false);
        console.log(err);
      }
    })


    // await uploadImage(imageURI, "contestants");
  };
  console.log(events);
  return (
    // <section className="bg-gray-100 min-h-[86vh] flex justify-center font-text">
      <form
        className="h-full px-2 bg-gray-100 w-full  flex py-10 justify-center gap-x-6"
        encType="multipart/form-data"
      >
        <ImageUploader
          image={image}
          setImage={setImage}
          setImageURI={setImageURI}
          className="w-72 h-72"
        />
        <article className="w-1/2 flex flex-col gap-y-3">
          <EventSelector options={events || []} setCategory={setEvent} />
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
          <div className="pt-5">
            <button
              // disabled={loading}
              onClick={handleSubmit}
              className="bg-green-200 w-full py-[0.6rem] hover:bg-green-300 flex items-center justify-center gap-x-4"
            >
              {loading && <ImSpinner3 className="animate-spin" />}
              {loading ? "Saving...." : "Save"}
            </button>
          </div>
        </article>
      </form>
    // </section>
  );
};

export default NewContestant;
