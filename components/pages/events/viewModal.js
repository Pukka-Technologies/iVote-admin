import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { dateFormater } from "../../../utils";

const ViewModal = ({ setIsOpen, isOpen, event }) => {
  const {
    name,
    opening_date,
    closing_date,
    vote_price,
    description,
    imageURL,
    createdAt,
  } = event;
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
                    <div>
                      <Image
                        src={imageURL}
                        width={500}
                        height={300}
                        alt="event"
                      />
                    </div>
                    <div className="flex xl:gap-8 gap-4 px-5 py-8 justify-between">
                      <div>
                        <h6 className="text-green-400 font-extrabold text-xs uppercase">
                          {dateFormater(opening_date).split(" ")[0] +
                            " " +
                            dateFormater(opening_date).split(" ")[2]}
                        </h6>
                        <h4 className="font-extrabold text-lg">
                          {dateFormater(opening_date).split(" ")[1] +
                            " " +
                            dateFormater(opening_date).split(" ")[3]}
                        </h4>
                      </div>
                      <div>
                        <h5 className="font-extrabold text-lg">{name}</h5>
                        <p className="text-gray-600">{description}</p>
                      </div>
                    </div>
                    <div className="flex xl:gap-8 gap-y-4 px-5 py-3 justify-between">
                      <div>
                        <h6 className="text-red-400 font-extrabold text-xs uppercase">
                          {dateFormater(closing_date).split(" ")[0] +
                            " " +
                            dateFormater(closing_date).split(" ")[2]}
                        </h6>
                        <h4 className="font-extrabold text-lg">
                          {dateFormater(closing_date).split(" ")[1] +
                            " " +
                            dateFormater(closing_date).split(" ")[3]}
                        </h4>
                      </div>
                      <div>
                        <h5 className="font-extrabold text-lg">
                          Cost per vote
                        </h5>
                        <p className="text-gray-600">
                          GH¢ {vote_price?.toFixed(2) || 1}
                        </p>
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

const ViewButton = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AiOutlineEye
        onClick={() => setIsOpen(true)}
        className="hover:text-gray-600 hover:scale-125"
      />
      <ViewModal setIsOpen={setIsOpen} isOpen={isOpen} event={event} />
    </>
  );
};

export default ViewButton;