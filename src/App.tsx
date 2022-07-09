import { useRoutes } from "react-router-dom";
import routeDeclarations from "@/constants/route-declarations";
import Providers from "./components/providers";

export default function App() {
  const routes = useRoutes(routeDeclarations);
  return <Providers>{routes}</Providers>;
}
