"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

interface data {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
}
export const AdminPage: FC = () => {
  const getAllUser = () => {
    return axios.get("/api/user/all");
  };

  const useQueryGetAllUser = useQuery({
    queryKey: ["getalluser"],
    queryFn: () => getAllUser(),
  });

  return (
    <div className="">
      {useQueryGetAllUser.data?.data?.data &&
        [...useQueryGetAllUser.data?.data?.data].map(
          (data: data, key: number) => (
            <Link
              key={key}
              href={`/gallery/${data.id}`}
              className="card w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img src={data.picture} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{data.name}!</h2>
                <p>{data.role}</p>
              </div>
            </Link>
          )
        )}
    </div>
  );
  // <pre>{JSON.stringify()}</pre>;
};
