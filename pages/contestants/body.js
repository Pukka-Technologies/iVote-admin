import React, { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { addContestant, fetchEvents } from "../../utils";
import ImageBox from "./imageBox";
import Selector from "./selector";
import Uploader from "./uploader";
import { toast } from "react-toastify";
import { ImSpinner3 } from "react-icons/im";
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

    const contestant = new FormData();
    contestant.append("name", name);
    contestant.append("event_id", event);
    contestant.append("contestant_code", code);
    contestant.append("imageURI", imageURI);

    const res = await addContestant(contestant, user.access_token);
    if (res.success) {
      toast.success("Event added successfully");
    } else {
      toast.error("Sorry something went wrong");
    }
    setLoading(false);
  };

  return (
    <section className="bg-gray-100 min-h-[86vh] flex justify-center items-center font-text">
      <form
        className="flex items-center w-full justify-center gap-x-20"
        encType="multipart/form-data"
      >
        {image ? (
          <ImageBox setImage={setImage} imageURI={image} />
        ) : (
          <Uploader setImageURI={setImageURI} setImage={setImage} />
        )}
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
              disabled={loading}
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
