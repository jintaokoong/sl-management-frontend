import useStore from "@/configurations/store";
import { pick } from "ramda";

const useHydration = () => {
  return useStore(pick(["hydrate", "hydrated"]));
};

export default useHydration;
