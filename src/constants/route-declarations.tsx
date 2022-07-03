import { RouteObject } from "react-router-dom";
import Login from "@/pages/login";

const routeDeclarations: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routeDeclarations;
