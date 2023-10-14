"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "../../../firebaseConfig";
import Image from "next/image";

const UserSetting = () => {
  const { data } = useSession();

  const queryClient = useQueryClient();

  const [name, setName] = useState("0");
  const [imageUrl, setImageUrl] = useState("");

  const [preiveImageFile, setPreiveImageFile] = useState<File | null>();

  //   const updateUser = () => axios.post("/api/user/update");

  const getUser = () => {
    return axios.post("/api/user/create", {
      name: "",
      email: data?.user?.email,
      image: "",
    });
  };

  const uploadFile = () => toast("uploading process");

  const lagreFile = () => toast.error("File size to large");

  const handleSelectedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    console.log;

    if (files && files[0].size < 10000000) {
      setPreiveImageFile(files[0]);
    } else {
      lagreFile();
    }
  };

  const handleUploadFile = () => {
    if (preiveImageFile) {
      const name = preiveImageFile.name;
      const storageRef = ref(storage, `image/${name}`);

      const uploadTask = uploadBytesResumable(storageRef, preiveImageFile);

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
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            uploadFile();
            setImageUrl(url);
            // console.log(url);
          });
        }
      );
    }
  };

  //   useEffect(() => {
  //     getUser().then((data) => console.log(data.data?.data));
  //   }, [data?.user?.email]);

  const useQueryGetUser = useQuery({
    queryKey: ["Getuser"],
    queryFn: () => getUser(),
  });

  //   const useQueryUpdateUser = useQuery({
  //     queryKey: ["update profile"],
  //     queryFn: () => updateUser(),
  //   });

  const updateUer = async () => {
    await axios.post("/api/user/update/", {
      name: name ? name : useQueryGetUser.data?.data?.data?.name,
      email: useQueryGetUser.data?.data?.data?.email,
      image: imageUrl ? imageUrl : useQueryGetUser.data?.data?.data?.picture,
    });
    queryClient.invalidateQueries({
      queryKey: ["Getuser"],
    });
  };
  return (
    <section>
      <div className=" flex  flex-col">
        <label className="avatar group" htmlFor="file">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative">
            <img
              src={
                preiveImageFile
                  ? URL.createObjectURL(preiveImageFile)
                  : useQueryGetUser.data?.data?.data?.picture
              }
            />
            {preiveImageFile && (
              <button
                className="absolute   top-[30%] left-[30%]"
                onClick={handleUploadFile}
              >
                <div className="w-10 ">
                  <Image
                    src="/upload.svg"
                    alt="svg"
                    width={20}
                    height={20}
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>
            )}
          </div>
          {!preiveImageFile && (
            <input
              type="file"
              id="file"
              name="file"
              className="hidden"
              onChange={handleSelectedFile}
            />
          )}
        </label>

        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Your Name</span>
          </label>
          <label className="input-group">
            <span>Name</span>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={
                name !== "0" ? name : useQueryGetUser.data?.data?.data?.name
              }
              placeholder="info@site.com"
              className="input input-bordered"
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Your Email</span>
          </label>
          <label className="input-group">
            <span>Email</span>
            <input
              type="text"
              id="email"
              value={useQueryGetUser.data?.data?.data?.email}
              className="input input-bordered"
              disabled={true}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="role">
            <span className="label-text">Your Role</span>
          </label>
          <label className="input-group">
            <span>Role</span>
            <input
              type="text"
              id="name"
              value={useQueryGetUser.data?.data?.data?.role}
              className="input input-bordered"
              disabled={true}
            />
          </label>
        </div>
      </div>

      {(name != "0" || imageUrl) && (
        <button
          className="btn btn-outline btn-success mt-4"
          onClick={() => updateUer()}
        >
          Upload
        </button>
      )}
      {/* <pre>{JSON.stringify(useQueryGetUser.data?.data?.data)}</pre> */}
    </section>
  );
};

export default UserSetting;
