import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-[#F05A28]" : "";

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
            <NavLink to="/sales" className={linkClass}>
              Sales
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className={linkClass}>
              Products
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
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
