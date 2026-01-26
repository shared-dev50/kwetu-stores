import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Sales from "../pages/Sales";
import Products from "../pages/Products";
import Invoices from "../pages/Invoices";
import InventoryActivity from "../pages/InventoryActivity";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/sales", element: <Sales /> },
      { path: "/products", element: <Products /> },
      { path: "/invoices", element: <Invoices /> },
      { path: "/activity", element: <InventoryActivity /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

export default router;
