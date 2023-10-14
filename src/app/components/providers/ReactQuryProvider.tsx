"use client";
import { ReactNode, FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ReactQuryProvider {
  children: ReactNode;
}

const ReactQuryProvider: FC<ReactQuryProvider> = ({ children }) => {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQuryProvider;
