import { FC, PropsWithChildren } from "react";
import useAuth from "@/hooks/use-auth";
import useProtectRoute from "@/hooks/use-protect-route";

const Navigator: FC<PropsWithChildren> = ({ children }) => {
  const { user, hydrated } = useAuth();
  useProtectRoute(hydrated, Boolean(user));
  return <>{children}</>;
};
export default Navigator;
