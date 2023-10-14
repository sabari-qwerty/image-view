"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { FC, ReactNode } from "react";
import ReactQuryProvider from "./ReactQuryProvider";

interface AuthProviders {
  children: ReactNode;
}

export const AuthProviders: FC<AuthProviders> = ({ children }) => {
  return (
    <SessionProvider>
      <ReactQuryProvider>{children}</ReactQuryProvider>
    </SessionProvider>
  );
};
