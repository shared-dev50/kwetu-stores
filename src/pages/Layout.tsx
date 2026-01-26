import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-base-200 p-4">
          <Navbar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
