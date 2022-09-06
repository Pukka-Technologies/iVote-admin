import React, { useState } from "react";
import { removeImage, uploadImage } from "../../../firebase";

import EventSelector from "../../EventSelector";
import { ImSpinner3 } from "react-icons/im";
import ImageUploader from "../../ImageUploader";
import { addContestant } from "../../../utils";
import { toast } from "react-toastify";
import { useStateValue } from "../../../context/StateProvider";
import { MdLock } from "react-icons/md";

const Settings = () => {
  const [{ user, events }, dispatch] = useStateValue();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!currentPassword || !newPassword) {
      toast.error("Fill out the fields");
      setLoading(false);
      return;
    }


  };
  return (
    // <section className="bg-gray-100 min-h-[86vh] flex justify-center font-text">
      <form
        className="h-full px-2 bg-gray-100 w-full  flex py-10 justify-center gap-x-6"
      >
        <article className="w-1/2 flex flex-col gap-y-3">
          <div className="pt-5">
            <input
              type="password"
              placeholder="Contestant NameCUrrent Password"
              className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <MdLock className="absolute top-2 right-2 text-gray-400" />
          </div>
          <div className="pt-5">
            <input
              type="password"
              placeholder="New Password"
              className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="pt-5">
            <button
              // disabled={loading}
              onClick={handleSubmit}
              className="bg-green-200 w-full py-[0.6rem] hover:bg-green-300 flex items-center justify-center gap-x-4"
            >
              {loading && <ImSpinner3 className="animate-spin" />}
              {loading ? "Saving...." : "Save"}
            </button>
          </div>
        </article>
      </form>
    // </section>
  );
};

export default Settings;
