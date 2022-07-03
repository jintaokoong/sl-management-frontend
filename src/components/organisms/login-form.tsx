import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { LoginFormValues, loginSchema } from "@/validations/login-schema";
import useFirebaseLogin from "@/hooks/use-firebase-login";
import { useBooleanToggle } from "@mantine/hooks";
import useAuthState from "@/hooks/use-auth-state";

const LoginForm = () => {
  const { getInputProps, onSubmit } = useForm<LoginFormValues>({
    initialValues: { email: "", password: "" },
    schema: zodResolver(loginSchema),
  });
  const { authenticated } = useAuthState();
  const [loading, toggle] = useBooleanToggle(false);
  const authenticate = useFirebaseLogin({
    onRequest: () => toggle(true),
    onSuccess: (creds) => {
      authenticated(creds.user);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => toggle(),
  });
  return (
    <form
      onSubmit={onSubmit((values) =>
        authenticate(values.email, values.password)
      )}
    >
      <Stack>
        <TextInput
          autoComplete={"email"}
          label={"電子郵箱"}
          required
          {...getInputProps("email")}
        />
        <PasswordInput
          autoComplete={"password"}
          label={"密碼"}
          required
          {...getInputProps("password")}
        />
        <Button type={"submit"} loading={loading}>
          登入
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
