import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-[#F05A28]" : "";

  const logout = useAuthStore(s => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col h-full justify-between">
        <ul>
          <li>
            <NavLink to="/" className={linkClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={linkClass}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/inventory" className={linkClass}>
              Inventory
            </NavLink>
          </li>

          <li>
            <NavLink to="/invoices" className={linkClass}>
              Invoices
            </NavLink>
          </li>
        </ul>
        <div>
          <ul>
            <li>
              <NavLink to="/activity" className={linkClass}>
                Inventory Activity
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={linkClass}>
                Settings
              </NavLink>
            </li>
            <div className="border-t pt-4 border-base-300">
              <div className="px-4 mb-2"></div>
              <button
                onClick={handleLogout}
                className="btn btn-error btn-outline btn-sm w-full"
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
