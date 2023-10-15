"use client";
import { FC } from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

interface image {
  id: string;
  email: string;
  image_url: string;
}

export const UserPage: FC = () => {
  const { data } = useSession();

  const querCliet = new QueryClient();

  const getImage = async () => {
    const email = await data?.user?.email;
    return await axios.get(`/api/image?email=${email}`);
  };

  const useQueryGetImage = useQuery({
    queryKey: ["GetAllImage"],
    queryFn: () => getImage(),
  });

  const DelteImage = async (id: string) => {
    await axios.delete(`/api/image/delete?id=${id}`);
    querCliet.invalidateQueries(["GetAllImage"]);
  };

  return (
    <section>
      {useQueryGetImage?.data?.data?.data &&
        [...useQueryGetImage?.data?.data?.data].map(
          (data: image, key: number) => (
            <div
              className="card w-96 bg-base-100 shadow-xl group relative"
              key={key}
            >
              <figure>
                <img src={data.image_url} alt="Shoes" />
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
          )
        )}
    </section>
  );
};
