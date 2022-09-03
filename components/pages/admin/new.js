import { ImSpinner3 } from "react-icons/im";
import ImageUploader from "../../ImageUploader";
import { addAdmin } from "../../../utils";
import { toast } from "react-toastify";
import { uploadImage } from "../../../firebase";
import { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";

const Admin = () => {
  const [{ user }, dispatch] = useStateValue();
  const [image, setImage] = useState(null);
  const [imageURI, setImageURI] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Upload event photo");
      return;
    }
    if (!name || !username) {
      toast.error("Fill event name and description");
      return;
    }
    if(!email || !password){
      toast.error("Fill email and password");
      return;
    }

    setLoading(true);


    // upload image
    const imageURL = await uploadImage(
      imageURI,
      "admins",
      async (downloadURL) => {
        const admin = {
          full_name: name,
          username,
          password,
          email,          
          avatar: downloadURL,
        };
        try {
          const res = await addAdmin(admin, user?.access_token);
          if (res && res.success) {
            toast.success("Admin added successfully");
            // reset form
            setImage(null);
            setImageURI(null);
            setName("");
            setEmail("");
            setUsername("");
            setPassword("");

            // update state
            dispatch({
              type: "ADD_ADMIN",
              admin: res.data,
            });
            setLoading(false);
            return;
          }
          toast.error(res.data.message);
          setLoading(false);
        } catch (err) {
          toast.error("Something went wrongggg");
          setLoading(false);
          console.log(err);
        }
      }
    );
  };
  return (
    <form
      encType="multipart/form-data"
      className="h-full px-2 bg-gray-100 w-full  flex py-10 justify-center gap-x-10"
    >
      {/* <div className="w-1/2 h-72  overflow-x-hidden mx-3 box-border flex items-center justify-center border-2 border-dotted border-gray-300"> */}
      <ImageUploader
        image={image}
        setImage={setImage}
        setImageURI={setImageURI}
        className="w-72 h-72"
      />
      {/* </div> */}
      <div className="w-1/2 flex flex-col gap-y-3">
        <input
          type="text"
          placeholder="Full Name"
          className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        

        <button
          // disabled={loading}
          onClick={handleSubmit}
          className="font-medium text-black cursor-pointer bg-green-400 px-[1em] py-[0.6em] flex  items-center justify-center gap-2"
        >
          {loading && <ImSpinner3 className="animate-spin" />}
          {loading ? "Saving...." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Admin;
