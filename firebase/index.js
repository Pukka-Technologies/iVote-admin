import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "../firebase.config";

export const uploadImage = async (imageURI, path) => {
  // new date to iso string remove : and . and replace with -
  const id = new Date().toISOString().replace(/:|\./g, "-");
  const storageRef = ref(storage, `${path}/${id}-${imageURI.name}`);
  const uploadTask = uploadBytesResumable(storageRef, imageURI);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Image Upload is " + progress + "% done");
      //   switch (snapshot.state) {
      //     case "paused":
      //       console.log("Upload is paused");
      //       break;
      //     case "running":
      //       console.log("Upload is running");
      //       break;
      //   }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          console.log("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          console.log("User canceled the upload");
          break;
        case "storage/unknown":
          console.log("Unknown error occurred, inspect error.serverResponse");
          break;
      }
      return error;
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        return downloadURL;
      });
    }
  );
};

export const removeImage = async (imageURL) => {
    const deleteRef = ref(storage, imageURL);
    deleteObject(deleteRef).then(() => {});
}
