import { QueryClient, QueryClientProvider } from "react-query";
import { FC, PropsWithChildren } from "react";

const client = new QueryClient();

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Providers;
