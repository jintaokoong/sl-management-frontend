import { useCallback } from "react";
import * as auth from "firebase/auth";
import app from "@/configurations/firebase";

interface Options {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

const useFirebaseLogout = (opt: Options) => {
  return useCallback(() => {
    return auth
      .signOut(auth.getAuth(app))
      .then(() => opt.onSuccess && opt.onSuccess())
      .catch((error) => opt.onError && opt.onError(error));
  }, [opt.onError, opt.onSuccess]);
};

export default useFirebaseLogout;
