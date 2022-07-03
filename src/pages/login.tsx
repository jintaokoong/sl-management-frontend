import LoginLayout from "@/components/templates/login-layout";
import LoginForm from "@/components/organisms/login-form";

const Login = () => {
  return <LoginLayout formContent={<LoginForm />} />;
};

export default Login;
