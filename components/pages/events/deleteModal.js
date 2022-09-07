import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { useStateValue } from "../../../context/StateProvider";
import { Delete } from "../../../utils";

const DeleteModal = ({ setIsOpen, isOpen, event}) => {

  const [{user}, dispatch] = useStateValue()

  const deleteEvent = () => {
    Delete(user.access_token, "event", event._id)
    setIsOpen(false)
  }

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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <article className="bg-white rounded-lg overflow-hidden cursor-pointer font-text">
                    <div
                      className="flex w-full flex-row-reverse pb-5"
                      onClick={() => setIsOpen(false)}
                    >
                      <button className="items-end bg-green-200 text-green-800 p-2">
                        <AiOutlineClose />
                      </button>
                    </div>
                    <h1 className="text-center">
                      Are you sure you want to delete?
                    </h1>
                    <div className="flex gap-6 justify-center pt-5 pb-5">
                      <button onClick={deleteEvent} className="bg-green-500 text-white px-4 py-2">
                        Yes
                      </button>
                      <button className="bg-red-100 px-4 py-2">No</button>
                    </div>
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

const DeleteButton = ({event}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
        <AiOutlineDelete
          className="hover:text-gray-600 hover:scale-125"
          onClick={() => setIsOpen(true)}
        />
      <DeleteModal event={event} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default DeleteButton;