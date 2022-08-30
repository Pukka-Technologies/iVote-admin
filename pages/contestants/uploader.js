import { MdCloudUpload } from "react-icons/md";
const Uploader = () => {
  return (
    <article>
      <label
        htmlFor="file-upload"
        className="flex flex-col justify-center items-center rounded-lg cursor-pointer border-2 border-dashed p-10"
      >
        <div className="flex flex-col justify-center items-center pt-5 pb-6 gap-2">
          <MdCloudUpload className="text-gray-500 text-3xl " />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click here to upload</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG OR JPG (MAX. 400x400px)
          </p>
        </div>
        <input
          id="file-upload"
          name="uploadimage"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>
    </article>
  );
};

export default Uploader;
