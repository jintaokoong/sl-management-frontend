import useFirebaseListener from "@/hooks/use-firebase-listener";
import useAuthState from "@/hooks/use-auth-state";
import useHydration from "@/hooks/use-hydration";

const useAuth = () => {
  const { user, authenticated, unauthorized } = useAuthState();
  const { hydrated, hydrate } = useHydration();

  useFirebaseListener((user) => {
    if (user) {
      authenticated(user);
    } else {
      unauthorized();
    }
    hydrate();
  });

  return hydrated && Boolean(user);
};

export default useAuth;
