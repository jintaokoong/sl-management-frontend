import * as auth from "firebase/auth";
import app from "@/configurations/firebase";
import { useCallback } from "react";

interface Options {
  onRequest?: () => void;
  onSuccess?: (creds: auth.UserCredential) => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
}

const useFirebaseLogin = (options: Options) => {
  return useCallback(
    (email: string, password: string) => {
      options.onRequest && options.onRequest();
      return auth
        .signInWithEmailAndPassword(auth.getAuth(app), email, password)
        .then((values) => options.onSuccess && options.onSuccess(values))
        .catch((error) => options.onError && options.onError(error))
        .finally(() => options.onSettled && options.onSettled());
    },
    [options.onRequest, options.onError, options.onSettled, options.onSuccess]
  );
};

export default useFirebaseLogin;
