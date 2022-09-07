import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { ImSpinner3 } from "react-icons/im";
import ImageUploader from "../../../components/ImageUploader";
import { toast } from "react-toastify";
import { removeImage, uploadImage } from "../../../firebase";
import { useStateValue } from "../../../context/StateProvider";
import EventSelector from "../../EventSelector";
import { editContestant } from "../../../utils";
import { MdHowToVote } from "react-icons/md";

const EditModal = ({ setIsOpen, isOpen, data }) => {
  const [{ user }, dispatch] = useStateValue();
  const [imageURI, setImageURI] = useState(null);
  const [image, setImage] = useState(data.imageURL);
  const [event, setEvent] = useState(data.event_id);
  const [name, setName] = useState(data.name);
  const [code, setCode] = useState(data.contestant_code);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!image && !imageURI) {
      toast.error("Add contestant image");
      setLoading(false);
      return;
    }

    if (!name || !code || !event) {
      toast.error("Make sure all fields are filled");
      setLoading(false);
      return;
    }

    if (imageURI) {
      await uploadImage(imageURI, "contestants", async (downloadURL) => {
        const contestant = {
          name,
          event_id: event,
          contestant_code: code,
          imageURL: downloadURL,
        };
        try {
          const res = await editContestant(
            data._id,
            user?.access_token,
            contestant
          );
          if (res && res.success) {
            toast.success("Contestant updated successfully");

            // update state
            dispatch({
              type: "UPDATE_CONTESTANT",
              contestant: res.data,
            });
            await removeImage(data.imageURL);
            setLoading(false);
            return;
          }
          toast.error("Something went wrong");
          setLoading(false);
        } catch (err) {
          // remove image from storage
          await removeImage(downloadURL);
          toast.error("Something went wrong");
          setLoading(false);
          console.log(err);
        }
      });
    } else {
      const contestant = {
        name,
        event_id: event,
        contestant_code: code,
        imageURL: image,
      };
      try {
        const res = await editContestant(
          data._id,
          user?.access_token,
          contestant
        );
        if (res && res.success) {
          toast.success("Contestant updated successfully");

          // update state
          dispatch({
            type: "UPDATE_CONTESTANT",
            contestant: res.data,
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

    // await uploadImage(imageURI, "contestants");
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                  <article className="rounded-lg overflow-hidden cursor-pointer font-text">
                    <div className="flex w-full flex-row-reverse pb-5">
                      <button
                        className="items-end bg-green-200 text-green-800 p-2 outline-none "
                        onClick={() => setIsOpen(false)}
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
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
                        <EventSelector
                          setCategory={setEvent}
                          category={event}
                        />
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

const EditButton = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{}, dispatch] = useStateValue();

  const handleEdit = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AiOutlineEdit
        className="hover:text-gray-600 hover:scale-125"
        onClick={handleEdit}
      />
      <EditModal data={data} setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default EditButton;
