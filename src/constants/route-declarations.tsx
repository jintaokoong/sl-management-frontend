import { Outlet, RouteObject } from "react-router-dom";
import Login from "@/pages/login";
import Heimdall from "@/components/heimdall";
import Navigator from "@/components/navigator";
import DashboardLayout from "@/components/templates/dashboard-layout";
import Songs from "@/pages/songs";

const routeDeclarations: RouteObject[] = [
  {
    path: "/",
    element: (
      <Navigator>
        <Outlet />
      </Navigator>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "main",
        element: (
          <Heimdall>
            <DashboardLayout />
          </Heimdall>
        ),
        children: [
          {
            path: "songs",
            element: <Songs />,
          },
        ],
      },
    ],
  },
];

export default routeDeclarations;
