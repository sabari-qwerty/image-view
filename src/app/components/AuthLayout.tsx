"use client";
import { ReactNode, FC } from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { NavcationBar } from "./NavcationBar";

interface AuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayout> = ({ children }) => {
  const { data } = useSession();

  if (!data?.user)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <button
          className="btn btn-outline btn-warning"
          onClick={() => signIn()}
        >
          signIn
        </button>
      </div>
    );

  return (
    <div className="w-[90%] mx-auto mt-4 flex flex-col space-y-4">
      <NavcationBar />
      {children}
    </div>
  );
};

export default AuthLayout;
