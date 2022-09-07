import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ImSpinner3 } from "react-icons/im";
import ImageUploader from "../../../components/ImageUploader";
import { RangeDatePicker } from "../../../components/Datepicker";
import { addEvent, editEvent } from "../../../utils";
import { toast } from "react-toastify";
import { uploadImage } from "../../../firebase";
import { useStateValue } from "../../../context/StateProvider";

export const EditModal = ({ setIsOpen, isOpen, event_data }) => {
  const [{ user }, dispatch] = useStateValue();
  const [image, setImage] = useState(event_data.imageURL);
  const [imageURI, setImageURI] = useState(null);
  const [name, setName] = useState(event_data.name);
  const [description, setDescription] = useState(event_data.description);
  const [startDate, setStartDate] = useState(new Date(event_data.opening_date));
  const [endDate, setEndDate] = useState(new Date(event_data.closing_date));
  const [loading, setLoading] = useState(false);
  const [vote_price, setVote_price] = useState(event_data.vote_price || 1);

  // const { name, opening_date, closing_date, description, imageURL, createdAt } = data;

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
    if (imageURI) {
      await uploadImage(imageURI, "events", async (downloadURL) => {
        const event = {
          name,
          description,
          opening_date,
          closing_date,
          imageURL: downloadURL,
          vote_price,
        };

        try {
          const res = await editEvent(
            event_data._id,
            user?.access_token,
            event
          );
          if (res && res.success) {
            toast.success("Event Updated successfully");
            // remove old image
            await removeImage(image);
            // update state
            dispatch({
              type: "UPDATE_EVENT",
              event: res.data,
            });
            setLoading(false);
            return;
          }
          toast.error("Something went wrong");
          setLoading(false);
        } catch (err) {
          toast.error("Something went wrong");
          setLoading(false);
          // remove uploaded image
          await removeImage(downloadURL);
          console.log(err);
        }
      });
    } else {
      const event = {
        name,
        description,
        opening_date,
        closing_date,
        imageURL: image,
        vote_price
      };
      try {
        const res = await editEvent(event_data._id, user?.access_token, event);
        if (res && res.success) {
          toast.success("Event Updated successfully");
          // update state
          dispatch({
            type: "UPDATE_EVENT",
            event: res.data,
          });
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
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                  <article className="rounded-lg overflow-hidden cursor-pointer font-text">
                    <div
                      className="flex w-full flex-row-reverse pb-5"
                      onClick={() => setIsOpen(false)}
                    >
                      <button className="items-end bg-green-200 text-green-800 p-2">
                        <AiOutlineClose />
                      </button>
                    </div>
                    <form
                      encType="multipart/form-data"
                      className="h-full px-2 w-full flex py-10 justify-center gap-x-8 font-text"
                    >
                      <div className="w-[60%] h-96  overflow-x-hidden mx-3 box-border flex items-center justify-center border-2 border-dotted border-gray-300">
                        <ImageUploader
                          test={event_data.imageURL}
                          image={image}
                          setImage={setImage}
                          setImageURI={setImageURI}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="w-[40%] flex flex-col gap-y-3">
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
                        <input
                          type="number"
                          placeholder="Price per vote (GH¢)"
                          className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400 w-full"
                          value={vote_price}
                          onChange={(e) => setVote_price(e.target.value)}
                        />
                        <RangeDatePicker
                          startDate={startDate}
                          setStartDate={setStartDate}
                          endDate={endDate}
                          setEndDate={setEndDate}
                        />
                        <button
                          // disabled={loading}
                          onClick={handleSubmit}
                          className="font-medium text-white cursor-pointer bg-green-400 px-[1em] py-[0.6em] flex  items-center justify-center gap-2"
                        >
                          {loading && <ImSpinner3 className="animate-spin" />}
                          {loading ? "Saving...." : "Save"}
                        </button>
                      </div>
                    </form>
                  </article>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
