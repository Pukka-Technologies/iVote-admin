import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { Delete, ManualVote } from "../../../utils";
import { ImSpinner3 } from "react-icons/im";
import Image from "next/image";
import { MdHowToVote } from "react-icons/md";
import { toast } from "react-toastify";
import { useStateValue } from "../../../context/StateProvider";

const DeleteModal = ({ setIsOpen, isOpen, id }) => {

  const [{user}, dispatch] = useStateValue()

  const deleteContestant = () => {
    Delete(user.access_token, "contestant", id, (data) => {

        // delete contestant from the state
        dispatch({
          type: "DELETE_CONTESTANT",
          contestant: data
        })
        toast.success("Contestant deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          toastId: "deleteContestant",
        });
        setIsOpen(false)
      
    })
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
                      <button onClick={deleteContestant} className="bg-green-500 text-white px-4 py-2">
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
const VoteModal = ({ setIsOpen, isOpen, data }) => {
  const [loading, setLoading] = useState(false);
  const [vote, setVote] = useState("");
  const [{events, user}, dispatch] = useStateValue()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(vote === ""){
      toast.error("Please enter a vote", {
        position: "top-center",
        autoClose: 3000,
        toastId: "voteError",
      });
      setLoading(false);
      return
    }
    // check if note is a number
    if(isNaN(vote)){
      toast.error("Vote must be a number", {
        position: "top-center",
        autoClose: 3000,
        toastId: "voteError",
      });
      setLoading(false);
      return
    }
    // check if vote is greater than 0 and has no decimal
    if(vote <= 0 || vote % 1 !== 0){  
      toast.error("Vote must be a whole number greater than 0", {
        position: "top-center",
        autoClose: 3000,
        toastId: "voteError",
      });
      setLoading(false);
      return

    }
    const votingData = {
      total_votes: vote,
      event_id: data.event_id,
      contestant_id: data._id,
      cost : (events.find(event => event._id === data.event_id)?.vote_price || 1) * vote,
      type: "manual"
    }
    await ManualVote(user?.access_token, votingData, (data) => {
      if (data.success) {
        dispatch({
          type: "ADD_VOTE",
          vote: data.vote
        })
        toast.success("Vote added successfully", {
          position: "top-center",
          autoClose: 3000,
          toastId: "addVote",
        })
        setLoading(false);
        // setIsOpen(false);
        // clear the input
        setVote("");
      }
    });

    // toast.info("This feature is not yet available");
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <article className="rounded-lg overflow-hidden cursor-pointer font-text">
                    <div
                      className="flex w-full justify-between items-center  pb-5"
                    >
                      <h2 className="flex items-center justify-center gap-x-5 text-xl text-red-500">
                        Creating Manual Vote <MdHowToVote />
                      </h2>
                      <button                       onClick={() => setIsOpen(false)} className="items-end bg-green-200 outline-none text-green-800 p-2">
                        <AiOutlineClose />
                      </button>
                    </div>
                    <form className="h-full px-2 bg-gray-100 w-full  flex py-10 justify-center gap-x-6">
                      <div className="w-1/2 h-72 relative">
                        <Image
                          src={data.imageURL}
                          alt={data.name}
                          layout="fill"
                        />
                      </div>
                      <article className="w-1/2 flex flex-col gap-y-3">
                        <div className="pt-3">
                          <input
                            type="text"
                            value={"Name: " + data.name}
                            className="p-2 py-1 w-full focus:border-none focus:outline-green-400"
                            disabled
                          />
                        </div>
                        <div className="pt-1">
                          <input
                            type="text"
                            value={"Code: " + data.contestant_code}
                            className="p-2 py-1 w-full focus:border-none focus:outline-green-400"
                            disabled
                          />
                        </div>
                        <div className="pt-5">
                          <input
                            type="text"
                            placeholder="Number of Votes"
                            className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
                            onChange={(e) => setVote(e.target.value)}
                            value={vote}
                          />
                        </div>
                        <div className="pt-5">
                          <button
                            disabled={loading}
                            onClick={handleSubmit}
                            className="bg-green-200 w-full py-[0.6rem] hover:bg-green-300 flex items-center justify-center gap-x-4"
                          >
                            {loading && <ImSpinner3 className="animate-spin" />}
                            {loading ? "Adding vote...." : "Add Vote"}
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

const DeleteButton = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AiOutlineDelete
        className="hover:text-gray-600 hover:scale-125"
        onClick={() => setIsOpen(true)}
      />
      <DeleteModal setIsOpen={setIsOpen} isOpen={isOpen} id={data._id} />
    </>
  );
};

const VoteButton = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MdHowToVote
        className="text-green-500 hover:scale-125"
        title="Add Vote"
        onClick={() => setIsOpen(true)}
      />
      <VoteModal setIsOpen={setIsOpen} isOpen={isOpen} data={data} />
    </>
  );
};

export { DeleteButton, VoteButton };
