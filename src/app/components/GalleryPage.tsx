"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { AdminPage } from "./Gallery/AdminPage";
import { UserPage } from "./Gallery/UserPage";

export const GalleryPage: FC = () => {
  const { data } = useSession();

  const getUser = () => {
    return axios.post("/api/user/create", {
      name: "",
      email: data?.user?.email,
      image: "",
    });
  };

  const useQueryGetUser = useQuery({
    queryKey: ["Getuser"],
    queryFn: () => getUser(),
  });

  if (useQueryGetUser.data?.data?.data?.role == "admin") {
    return <AdminPage />;
  }
  return <UserPage />;
};
