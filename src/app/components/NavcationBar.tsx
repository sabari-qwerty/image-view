"use client";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export const NavcationBar: FC = () => {
  const { data } = useSession();

  const createUser = () => axios.post("/api/user/create", data?.user);

  const useQueriesCreateUser = useQuery({
    queryKey: ["createuser"],
    queryFn: () => createUser(),
  });

  return (
    <div className="navbar bg-base-200 rounded-xl">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">ImaGe</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={useQueriesCreateUser.data?.data?.data?.picture as string}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/"} className="justify-between">
                Gallery
              </Link>
            </li>
            <li>
              <Link href={"/setting"}>Settings</Link>
            </li>
            <li>
              <button onClick={() => signOut()}>SignOut</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
