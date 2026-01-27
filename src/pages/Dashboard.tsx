import { FaUserCircle, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back 👋</h1>
          <p className="text-sm text-gray-500">Here’s what’s happening today</p>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-64"
          />
          <div className="flex items-center gap-2">
            <FaUserCircle size={28} />
            <span className="font-medium">John Doe</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Total Items</h2>
            <p className="text-3xl font-bold">1,248</p>
          </div>
        </div>

        <div className="card bg-warning text-warning-content shadow">
          <div className="card-body">
            <h2 className="card-title">Low Stock</h2>
            <p className="text-3xl font-bold">18</p>
          </div>
        </div>

        <div className="card bg-error text-error-content shadow">
          <div className="card-body">
            <h2 className="card-title">Out of Stock</h2>
            <p className="text-3xl font-bold">7</p>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Low Stock Items</h2>

          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>SKU</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sugar 2kg</td>
                  <td>SKU-1023</td>
                  <td className="text-warning font-bold">4</td>
                </tr>
                <tr>
                  <td>Cooking Oil</td>
                  <td>SKU-2211</td>
                  <td className="text-warning font-bold">6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FaArrowUp className="text-success" /> Stock In
            </h2>
            <p className="text-3xl font-bold text-success">+124</p>
            <p className="text-sm text-gray-500">Items added today</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FaArrowDown className="text-error" /> Stock Out
            </h2>
            <p className="text-3xl font-bold text-error">-98</p>
            <p className="text-sm text-gray-500">Items sold today</p>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Recent Activity</h2>

          <ul className="space-y-2 text-sm">
            <li>🧾 Sold 3 × Rice 5kg</li>
            <li>📦 Added 20 × Maize Flour</li>
            <li>⚠️ Sugar 2kg marked low stock</li>
            <li>🧾 Sold 1 × Cooking Oil</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
