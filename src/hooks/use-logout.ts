import useFirebaseLogout from "@/hooks/use-firebase-logout";
import useAuthState from "@/hooks/use-auth-state";

const useLogout = () => {
  const { unauthorized } = useAuthState();
  return useFirebaseLogout({
    onSuccess: () => {
      unauthorized();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useLogout;
