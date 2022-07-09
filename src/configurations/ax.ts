import axios from "axios";
import { assoc, defaultTo } from "ramda";
import { getAuth } from "firebase/auth";
import app from "./firebase";

const ax = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

ax.interceptors.request.use(async (config) => {
  const auth = getAuth(app);
  if (auth.currentUser) {
    try {
      const token = await auth.currentUser.getIdToken();
      config.headers = assoc(
        "Authorization",
        `Bearer ${token}`,
        defaultTo({}, config.headers)
      );
    } catch (error) {
      console.error(error);
    }
  }
  return config;
});

export default ax;
