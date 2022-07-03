import { Outlet, RouteObject } from "react-router-dom";
import Login from "@/pages/login";
import Heimdall from "@/components/heimdall";
import Navigator from "@/components/navigator";
import DashboardLayout from "@/components/templates/dashboard-layout";

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
            element: <div>Songs</div>,
          },
        ],
      },
    ],
  },
];

export default routeDeclarations;
