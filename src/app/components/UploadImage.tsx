"use client";
import { FC, useState, ChangeEvent } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import axios from "axios";

export const UploadImage = () => {
  const { data } = useSession();

  const [ImageFile, setImageFile] = useState<File | null>();

  // const [downloadUrl, setDownloadUrl] = useState("");

  const uploadFile = () => toast("uploading process");

  const lagreFile = () => toast.error("File size to large");

  const handleSelectedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    console.log;

    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      lagreFile();
    }
  };

  const handleUploadFile = async () => {
    if (ImageFile) {
      const name = ImageFile.name;
      const storageRef = ref(storage, `image/${name}`);

      const uploadTask = uploadBytesResumable(storageRef, ImageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
            case "running":
              console.log("upload is running");
          }
        },
        (err) => {
          toast(err.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            await axios.post("/api/image/upload", {
              email: data?.user?.email,
              image: url,
            });
            setImageFile(null);

            uploadFile();
            // console.log(url);
          });
        }
      );
    }
  };

  return (
    <section className="w-full flex flex-col space-y-4">
      <input
        type="file"
        className="file-input file-input-bordered  w-full "
        onChange={handleSelectedFile}
      />
      {ImageFile && (
        <div className="relative mx-auto  w-fit h-fit group ">
          <img
            src={URL.createObjectURL(ImageFile)}
            alt="preview"
            className="group-hover:opacity-80 "
          />

          <button
            onClick={() => handleUploadFile()}
            className="absolute invisible group-hover:visible  top-[50%] left-[50%] z-50 btn btn-outline btn-accent"
          >
            upload
          </button>
        </div>
      )}
    </section>
  );
};
