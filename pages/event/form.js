import { useState } from "react";
import { toast } from "react-toastify";
import { RangeDatePicker } from "../../components/Datepicker";
import ImageUploader from "../../components/ImageUploader";
import { ImSpinner3 } from "react-icons/im";
const Form = () => {
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
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    const eventData = {
      image: imageURI,
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };

    console.log(eventData);
    setLoading(false);
  };
  return (
    <form
      encType="multipart/form-data"
      className="min-h-[86vh] px-2 bg-gray-100  overflow-x-hidden flex items-center justify-center gap-x-4"
    >
      <div className="w-[55%] h-72  overflow-x-hidden mx-3 box-border flex items-center justify-center border-2 border-dotted border-gray-300">
        <ImageUploader
          image={image}
          setImage={setImage}
          setImageURI={setImageURI}
          className="h-full w-full"
        />
      </div>
      <div className="w-[45%] flex flex-col gap-y-3">
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
          disabled={loading}
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

export default Form;
