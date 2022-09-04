import { ImSpinner3 } from "react-icons/im";
import ImageUploader from "../../../components/ImageUploader";
import { RangeDatePicker } from "../../../components/Datepicker";
import { addEvent } from "../../../utils";
import { toast } from "react-toastify";
import { uploadImage } from "../../../firebase";
import { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";

const NewEvent = () => {
  const [{ user }, dispatch] = useStateValue();
  const [image, setImage] = useState(null);
  const [imageURI, setImageURI] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Upload event photo");
      return;
    }
    if (!name || !description) {
      toast.error("Fill event name and description");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Select event opening and closing date");
      return;
    }
    setLoading(true);
    
    // change date format to mongoDB format
    const opening_date = new Date(startDate).toISOString();
    const closing_date = new Date(endDate).toISOString();



    // upload image
    const imageURL = await uploadImage(imageURI, "events", async(downloadURL) => {
      const event = {
        name,
        description,
        opening_date,
        closing_date,
        imageURL: downloadURL,
      };
      try {
        const res = await addEvent(event, user?.access_token);
        if (res && res.success) {
          toast.success("Event added successfully");
          // reset form
          setImage(null);
          setImageURI(null);
          setName("");
          setDescription("");
          setStartDate(new Date());
          setEndDate(null);
          

          // update state
          dispatch({
            type: "ADD_EVENT",
            event: res.data
          })
          setLoading(false);
          return;
        }
        toast.error("Something went wrong");
        setLoading(false);
      } catch (err) {
        toast.error("Something went wrong");
        setLoading(false);
        console.log(err);
      }
    })
  };
  return (
    <form
      encType="multipart/form-data"
      className="h-full px-2 bg-gray-100 w-full  flex py-10 justify-center gap-x-4 font-text"
    >
      <div className="w-1/2 h-72  overflow-x-hidden mx-3 box-border flex items-center justify-center border-2 border-dotted border-gray-300">
        <ImageUploader
          image={image}
          setImage={setImage}
          setImageURI={setImageURI}
          className="h-full w-full"
        />
      </div>
      <div className="w-1/2 flex flex-col gap-y-3">
        <input
          type="text"
          placeholder="Event Name"
          className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400 w-full"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <RangeDatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <button
          // disabled={loading}
          onClick={handleSubmit}
          className="font-medium text-black cursor-pointer bg-green-400 px-[1em] py-[0.6em] flex  items-center justify-center gap-2"
        >
          {loading && <ImSpinner3 className="animate-spin" />}
          {loading ? "Saving...." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default NewEvent;
