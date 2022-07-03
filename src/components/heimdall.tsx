import { FC, PropsWithChildren } from "react";
import useAuthState from "@/hooks/use-auth-state";
import useHydration from "@/hooks/use-hydration";

const Heimdall: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthState();
  const { hydrated } = useHydration();
  return <>{hydrated && Boolean(user) ? children : null}</>;
};

export default Heimdall;
