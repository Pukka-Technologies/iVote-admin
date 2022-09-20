import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { Delete } from "../../../utils";
import {toast} from 'react-toastify'
import { useStateValue } from "../../../context/StateProvider";

const DeleteModal = ({ setIsOpen, isOpen, event }) => {
  const [{ user, events }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const deleteEvent = () => {
    setLoading(true);
    Delete(user?.access_token, "event", event._id, (data) => {
      // deletec event from state

      //  dispatch delete event from state

      dispatch({
        type: "DELETE_EVENT",
        event
      });

      }).then(() => {
       
          toast.success("Event deleted successfully", {
            position: "top-center",
            autoClose: 3000,
            toastId: "deleteEvent",
          });
        
        setIsOpen(false);
        setLoading(false);
      })
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <article className="bg-white rounded-lg overflow-hidden cursor-pointer font-text">
                    <div
                      className="flex w-full flex-row-reverse pb-5"
                      
                    >
                      <div onClick={() => setIsOpen(false)} className="items-end bg-green-200 text-green-800 p-2">
                        <AiOutlineClose />
                      </div>
                    </div>
                    <h1 className="text-center">
                      Are you sure you want to delete?
                    </h1>
                    <div className="flex gap-6 justify-center pt-5 pb-5">
                      <button
                        onClick={deleteEvent}
                        className="bg-green-500 text-white px-4 py-2 outline-none focus:border-none"
                      >
                        {
                            loading ? "Deleting..." : "Yes"
                        }
                      </button>
                      <button onClick={() => setIsOpen(false)} className="bg-red-100 px-4 py-2">No</button>
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

const DeleteButton = ({ event }) => {
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
};

export default DeleteButton;


  
