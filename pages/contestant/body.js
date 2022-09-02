import React, { useState } from "react";

import { ImSpinner3 } from "react-icons/im";
import ImageUploader from "../../components/ImageUploader";
import Selector from "./selector";
import { addContestant } from "../../utils";
import { toast } from "react-toastify";
import { uploadImage } from "../../firebase";
import { useStateValue } from "../../context/StateProvider";

const Body = () => {
  const [imageURI, setImageURI] = useState(null);
  const [image, setImage] = useState(null);
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [{ user }, dispatch] = useStateValue();

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
    
    console.log("start upload");
    const imageURL = await uploadImage(imageURI, "contestants");
    const contestant = {
      name, constestant_code: code, event_id: event, imageURL, votes: 0
    }
    const res = await addContestant(contestant, user.access_token);
    if (res.success) {
      toast.success("Event added successfully");
    } else {
      toast.error("Sorry something went wrong");
      // remove image from firebase
      await removeImage(imageURL);
    }
    setLoading(false);
  };

  return (
    <section className="bg-gray-100 min-h-[86vh] flex justify-center items-center font-text">
      <form
        className="flex items-center w-full justify-center gap-x-20"
        encType="multipart/form-data"
      >
        <ImageUploader
          image={image}
          setImage={setImage}
          setImageURI={setImageURI}
          className="w-72 h-72"
        />
        <article className="w-[50%] flex flex-col  justify-center gap-y-2">
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
    </section>
  );
};

export default Body;
