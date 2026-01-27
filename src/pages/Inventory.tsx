const Inventory = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <button className="btn btn-primary">Add New Product</button>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search product..."
          className="input input-bordered w-full max-w-md"
        />
        <select className="select select-bordered">
          <option>All Categories</option>
          <option>Food</option>
          <option>Household</option>
        </select>
        <select className="select select-bordered">
          <option>All Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rice 5kg</td>
              <td>SKU-1023</td>
              <td>Food</td>
              <td>12</td>
              <td>KSh 750</td>
              <td>
                <button className="btn btn-xs btn-warning">Edit</button>
                <button className="btn btn-xs btn-error ml-2">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Sugar 2kg</td>
              <td>SKU-1024</td>
              <td>Food</td>
              <td>4</td>
              <td>KSh 320</td>
              <td>
                <button className="btn btn-xs btn-warning">Edit</button>
                <button className="btn btn-xs btn-error ml-2">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Cooking Oil 1L</td>
              <td>SKU-2211</td>
              <td>Food</td>
              <td>0</td>
              <td>KSh 420</td>
              <td>
                <button className="btn btn-xs btn-warning">Edit</button>
                <button className="btn btn-xs btn-error ml-2">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Maize Flour 2kg</td>
              <td>SKU-3300</td>
              <td>Food</td>
              <td>25</td>
              <td>KSh 130</td>
              <td>
                <button className="btn btn-xs btn-warning">Edit</button>
                <button className="btn btn-xs btn-error ml-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
