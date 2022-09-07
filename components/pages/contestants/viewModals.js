import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";

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
                    <div
                      className="flex w-full flex-row-reverse pb-5"
                      onClick={() => setIsOpen(false)}
                    >
                      <button className="items-end bg-green-200 text-green-800 p-2">
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
                            <h6 className="text-red-400 font-extrabold text-xs uppercase">Code:</h6>
                            <h4 className="font-extrabold text-lg">{contestant_code}</h4>
                          </div>
                        </div>
                        <div className="flex xl:gap-8 gap-4 px-5 py-8 justify-between">
                          <div>
                            <h6 className="text-green-400 font-extrabold text-xs uppercase">
                              Votes
                            </h6>
                            <h4 className="font-extrabold text-lg">{votes}</h4>
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