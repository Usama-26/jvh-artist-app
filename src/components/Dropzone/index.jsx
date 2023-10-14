import Image from "next/image";
import { FiUploadCloud } from "react-icons/fi";
import { MdCloud, MdImage } from "react-icons/md";
import { RiUploadCloudFill } from "react-icons/ri";

const { useState, useEffect } = require("react");
const { useDropzone } = require("react-dropzone");

export default function Dropzone(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div className="w-32">
        <Image
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          width={128}
          height={128}
          alt={file.name}
        />
        <p className="text-xs text-gray-400 mt-4">{file.name}</p>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div
        {...getRootProps({
          className:
            "dropzone max-w-xs mx-auto text-center border flex justify-center border-dashed p-8 rounded-lg border-gray-400 cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          thumbs
        ) : (
          <div>
            <RiUploadCloudFill className="w-20 h-20 mx-auto fill-gray-200" />
            <h4>Upload Image</h4>
          </div>
        )}
      </div>
      <p className="text-xs text-center mt-2">Max Image Size: 3 MB</p>
    </section>
  );
}
