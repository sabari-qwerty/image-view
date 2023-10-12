"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { FC, ReactNode } from "react";

interface AuthProviders {
  children: ReactNode;
}

export const AuthProviders: FC<AuthProviders> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
