const InventoryActivity = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Activity</h1>
        <input
          type="text"
          placeholder="Search activity..."
          className="input input-bordered w-64"
        />
      </div>

      <div className="flex gap-4">
        <select className="select select-bordered">
          <option>All Users</option>
          <option>John Doe</option>
          <option>Mary W.</option>
        </select>

        <select className="select select-bordered">
          <option>All Actions</option>
          <option>Added</option>
          <option>Removed</option>
          <option>Adjusted</option>
        </select>

        <input type="date" className="input input-bordered" />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>User</th>
              <th>Product</th>
              <th>Action</th>
              <th>Quantity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>27-Jan-2026 09:15</td>
              <td>John Doe</td>
              <td>Rice 5kg</td>
              <td>Added</td>
              <td>20</td>
              <td>Restocked</td>
            </tr>
            <tr>
              <td>27-Jan-2026 10:30</td>
              <td>Mary W.</td>
              <td>Sugar 2kg</td>
              <td>Removed</td>
              <td>2</td>
              <td>Damaged</td>
            </tr>
            <tr>
              <td>26-Jan-2026 16:50</td>
              <td>John Doe</td>
              <td>Cooking Oil 1L</td>
              <td>Adjusted</td>
              <td>-1</td>
              <td>Correction</td>
            </tr>
            <tr>
              <td>26-Jan-2026 12:10</td>
              <td>Mary W.</td>
              <td>Maize Flour</td>
              <td>Added</td>
              <td>50</td>
              <td>Supplier delivery</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryActivity;
