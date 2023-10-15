"use client";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface AdminPage {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
}
export const AdminPage: FC = () => {
  const getAllUsaer = async () => await axios.get("/api/user/all");

  const useQueryGetAllUser = useQuery({
    queryKey: ["getAllUser"],
    queryFn: () => getAllUsaer(),
  });

  console.log();
  return (
    <main>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>email</th>
              <th>role </th>
              <th>update role</th>
            </tr>
          </thead>
          <tbody>
            {useQueryGetAllUser.data?.data?.data.map(
              (data: AdminPage, key: number) => (
                <tr
                  key={key}
                  className={`${data.role === "admin" ? "opacity-50" : ""}`}
                >
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={data.picture}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                  <td>
                    <button
                      className="btn btn-outline"
                      disabled={data.role === "admin"}
                    >
                      {data.role}
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
