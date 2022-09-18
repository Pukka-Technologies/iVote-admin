import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import Image from "next/image";
import { MdOutlineRemoveModerator } from "react-icons/md";
import { evictContestant } from "../../../utils";
import { toast } from "react-toastify";
import { useStateValue } from "../../../context/StateProvider";

const EvictButton = ({ data }) => {
  const { _id, is_evicted } = data;
  const [evicted, setEvicted] = useState(is_evicted);
  const actionData = {
    id: _id,
    status: !is_evicted,
  };
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const handleEviction = async () => {
    setLoading(true);
    await evictContestant(user?.access_token, actionData, (data) => {
      if (data.success) {
        dispatch({
          type: "UPDATE_CONTESTANT",
          contestant: data.data,
        });
        setEvicted(data.data.is_evicted);
        data.message = data.data.is_evicted? "Contestant evicted successfully" : "Contestant reinstated successfully";
        toast.success(data?.message || "Contestant evicted successfully", {
          position: "top-center",
          autoClose: 3000,
          toastId: "evictContestant",
        });
      }
      setLoading(false);
    });
  };
  return (
    <>
      <button
        disabled={loading}
        onClick={handleEviction}
        className={`flex items-center gap-x-2 
        ${
          !evicted
            ? "hover:bg-red-500 bg-red-400"
            : "hover:bg-green-500 bg-green-400"
        }
      text-white px-4 py-2 rounded cursor-pointer `}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <MdOutlineRemoveModerator />
            {evicted ? "Un-Evict" : "Evict"}
          </>
        )}
      </button>
    </>
  );
};

const ViewModal = ({ setIsOpen, isOpen, data }) => {
  const { name, contestant_code, imageURL, votes, createdAt } = data;
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <article className="bg-white rounded-lg overflow-hidden cursor-pointer font-text">
                    <div className="flex w-full flex-row-reverse pb-5">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="items-end bg-green-200 text-green-800 p-2 outline-none"
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                    <div className="flex w-full items-center justify-center gap-x-5">
                      <div className="w-1/2 h-80 relative">
                        <Image src={imageURL} alt={name} layout="fill" />
                      </div>
                      <div className="flex flex-col w-1/2">
                        <div className="flex xl:gap-8 gap-4 px-5 py-8 justify-between">
                          <div>
                            <h6 className="text-green-400 font-extrabold text-xs uppercase">
                              Name:{" "}
                            </h6>
                            <h4 className="font-extrabold text-lg">{name}</h4>
                          </div>
                        </div>
                        <div className="flex xl:gap-8 gap-y-4 px-5 py-3 justify-between">
                          <div>
                            <h6 className="text-red-400 font-extrabold text-xs uppercase">
                              Code:
                            </h6>
                            <h4 className="font-extrabold text-lg">
                              {contestant_code}
                            </h4>
                          </div>
                        </div>
                        <div className="flex items-center justify-between px-2">
                          <div className="flex xl:gap-8 gap-4 px-5 py-8 justify-between">
                            <div>
                              <h6 className="text-green-400 font-extrabold text-xs uppercase">
                                Votes
                              </h6>
                              <h4 className="font-extrabold text-lg">
                                {votes}
                              </h4>
                            </div>
                          </div>
                          <div className="flex xl:gap-8 gap-4 px-5 py-8 justify-center">
                            <EvictButton data={data} />
                          </div>
                        </div>
                      </div>
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

const ViewButton = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AiOutlineEye
        className="hover:text-gray-600 hover:scale-125"
        onClick={() => setIsOpen(true)}
      />
      <ViewModal setIsOpen={setIsOpen} isOpen={isOpen} data={data} />
    </>
  );
};

export default ViewButton;
