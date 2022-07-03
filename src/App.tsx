import { useRoutes } from "react-router-dom";
import routeDeclarations from "@/constants/route-declarations";

export default function App() {
  const routes = useRoutes(routeDeclarations);
  return routes;
}
