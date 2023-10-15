"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { constants } from "buffer";
import { useQuery } from "@tanstack/react-query";

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

  console.log(useQueryGetImage.data?.data?.data.length);

  if (useQueryGetImage.isLoading) return <>Loading</>;

  return (
    <main className="flex flex-wrap gap-5">
      {useQueryGetImage.data?.data?.data.length === 0 ? (
        <>no image</>
      ) : (
        useQueryGetImage.data?.data?.data.map((data: data, key: number) => (
          <img src={data.image_url} alt="data" key={key} />
        ))
      )}
    </main>
  );
};
