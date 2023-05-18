import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";

import PositionsPage from "./pages/PositionsPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import { EditPositionPage } from "./pages/EditPositionPage";
import { SectorPage } from "./pages/SectorPage";
import { IndustryPage } from "./pages/IndustryPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "positions", element: <PositionsPage /> },
        { path: "products", element: <ProductsPage /> },
        // { path: "positions", element: <PositionsPage /> },
        { path: "position/:id", element: <EditPositionPage /> },
        { path: "sector/:id", element: <SectorPage /> },
        { path: "industry/:id", element: <IndustryPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
