import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { any } from "ramda";

const privateRoutes = ["/main/songs"];
const publicRoutes = ["/login"];

const useProtectRoute = (hydrated: boolean, authenticated: boolean) => {
  const location = useLocation();
  const navigate = useNavigate();
  return useEffect(() => {
    if (!hydrated) return;

    const { pathname } = location;
    console.log(pathname);
    if (!authenticated && any((s) => pathname.startsWith(s), privateRoutes)) {
      navigate("/login", { replace: true });
    } else if (
      authenticated &&
      any((s) => pathname.startsWith(s), publicRoutes)
    ) {
      navigate("/main/songs", { replace: true });
    } else if (location.pathname === "/") {
      navigate(authenticated ? "/main/songs" : "/login");
    }
  }, [navigate, location, authenticated, hydrated]);
};

export default useProtectRoute;
