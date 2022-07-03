import useStore from "@/configurations/store";
import { pick } from "ramda";

const useAuthState = () => {
  return useStore(pick(["user", "unauthorized", "authenticated"]));
};

export default useAuthState;
