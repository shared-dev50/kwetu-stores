import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Invoices from "../pages/Invoices";
import InventoryActivity from "../pages/InventoryActivity";
import Settings from "../pages/Settings";
import Inventory from "../pages/Inventory";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/inventory", element: <Inventory /> },
      { path: "/products", element: <Products /> },
      { path: "/invoices", element: <Invoices /> },
      { path: "/activity", element: <InventoryActivity /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

export default router;
