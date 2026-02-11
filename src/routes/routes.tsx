import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Invoices from "../pages/Invoices";
import InventoryActivity from "../pages/InventoryActivity";
import Settings from "../pages/Settings";
import Inventory from "../pages/Inventory";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "products", element: <Products /> },
          { path: "invoices", element: <Invoices /> },

          {
            element: <ProtectedRoute allowedRoles={["manager"]} />,
            children: [
              { path: "inventory", element: <Inventory /> },
              { path: "activity", element: <InventoryActivity /> },
              { path: "settings", element: <Settings /> },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);
export default router;
