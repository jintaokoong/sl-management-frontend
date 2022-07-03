import { useEffect } from "react";
import * as auth from "firebase/auth";
import app from "@/configurations/firebase";

const useFirebaseListener = (callback: (user: auth.User | null) => void) => {
  useEffect(() => {
    const a = auth.getAuth(app);
    const unsub = a.onAuthStateChanged((user) => {
      callback(user);
    });
    return () => {
      unsub();
    };
  }, []);
};

export default useFirebaseListener;
