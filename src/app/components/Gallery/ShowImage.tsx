"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { constants } from "buffer";
import { QueryClient, useQuery } from "@tanstack/react-query";

interface data {
  id: string;
  email: string;
  image_url: string;
}

export const ShowImage: FC = () => {
  const router = usePathname();

  const id = router.split("/").splice(-1)[0];

  console.log(id);

  const getAllImage = async () => await axios.get(`/api/image?id=${id}`);

  const useQueryGetImage = useQuery({
    queryKey: ["getImage"],
    queryFn: () => getAllImage(),
  });

  const querCliet = new QueryClient();

  // console.log(useQueryGetImage.data?.data?.data.length);

  if (useQueryGetImage.isLoading) return <>Loading</>;

  const DelteImage = async (id: string) => {
    await axios.delete(`/api/image/delete?id=${id}`);
    querCliet.invalidateQueries(["GetAllImage"]);
  };

  return (
    <main className="flex flex-wrap gap-5">
      {useQueryGetImage.data?.data?.data.length === 0 ? (
        <>no image</>
      ) : (
        useQueryGetImage.data?.data?.data.map((data: data, key: number) => (
          <div
            className="card w-fit h-fit bg-base-100 shadow-xl group relative"
            key={key}
          >
            <figure>
              <img
                src={data.image_url}
                alt="Shoes"
                className="w-[200px] h-fit object-cover"
              />
            </figure>
            <div className="w-full h-full absolute top-0 invisible  group-hover:visible bg-[#00000041] flex justify-center items-center ">
              <button
                className="btn btn-error text-white"
                onClick={() => DelteImage(data.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
};
