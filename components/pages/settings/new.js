import React, { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { addContestant, changePassword } from "../../../utils";
import { toast } from "react-toastify";
import { useStateValue } from "../../../context/StateProvider";
import { MdLock } from "react-icons/md";
import { FiEye } from "react-icons/fi";

const Settings = () => {
  const [{ user, }, dispatch] = useStateValue();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!currentPassword) {
      toast.error("Enter current password");
      setLoading(false);
      return;
    }
    if (!newPassword) {
      toast.error("Create a new password");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const data = {
      password: newPassword,
      old_password: currentPassword,
    }
    const res = await changePassword(user?.access_token, data);
    if (res && res.success) {
      toast.success("Password changed successfully", {
        position: "top-center",
        delay: 3000,
        toastId: "passwordChanged",
      });
      setLoading(false);
      return;
    }else{
      toast.error("" + res?.message || "An error occured", {
        position: "top-center",
        delay: 3000,
        toastId: "passwordChanged",
      });
      setLoading(false);
      console.log(res);
    }


  };
  return (
      <form
        className="h-full px-2 bg-gray-100 w-full  flex py-10 justify-center gap-x-6"
      >
        <article className="w-1/2 flex flex-col gap-y-3">
          <h2 className="font-bold flex items-center justify-center gap-3 text-green-600 text-xl">Update User Password 
            <MdLock className="inline-block text-xl" />
          </h2>
          <div className="pt-5 relative">
          <div className="flex items-center justify-between my-1 px-2">
            <label htmlFor="current" className="text-gray-400" >Current Password</label>
            {/* <MdLock className=" text-gray-400" /> */}
            </div>
            <input
              type="password"
              placeholder="Current Password"
              className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
              id="current"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {/* <FiEye className="absolute top-16  right-5 text-gray-400 cursor-pointer"
              onClick={() => {
                const input = document.getElementById("current");
                input.type = input.type === "password" ? "text" : "password";
              }}
            /> */}
            {/* <MdLock className="absolute top-2 right-2 text-gray-400" /> */}
          </div>
          <div className="pt-5 relative">
            <div className="flex items-center justify-between my-1 px-2">
            <label htmlFor="newPassword" className="text-gray-400" >New Password</label>
            {/* <MdLock className=" text-gray-400" /> */}
            </div>
            <input
              type="password"
              placeholder="New Password"
              className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {/* <FiEye className="absolute top-16  right-5 text-gray-400 cursor-pointer" /> */}
          </div>
          <div className="pt-5 relative">
          <div className="flex items-center justify-between my-1 px-2">
            <label htmlFor="confirm" className="text-gray-400" >Confirm Password</label>
            {/* <MdLock className=" text-gray-400" /> */}
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-2 py-3 w-full focus:border-none focus:outline-green-400"
              id="confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* <FiEye className="absolute top-16  right-5 text-gray-400 cursor-pointer" /> */}
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
  );
};

export default Settings;
