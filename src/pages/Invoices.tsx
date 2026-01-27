const Invoices = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Invoices</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>
                <input
                  type="text"
                  placeholder="Invoice #"
                  className="input input-sm input-bordered w-full"
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Customer"
                  className="input input-sm input-bordered w-full"
                />
              </th>
              <th>
                <input
                  type="date"
                  className="input input-sm input-bordered w-full"
                />
              </th>
              <th></th>
              <th>
                <select className="select select-sm select-bordered w-full">
                  <option>All</option>
                  <option>Cash</option>
                  <option>Card</option>
                </select>
              </th>
              <th>
                <select className="select select-sm select-bordered w-full">
                  <option>All</option>
                  <option>Paid</option>
                  <option>Pending</option>
                </select>
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>INV-1001</td>
              <td>John Doe</td>
              <td>27-Jan-2026</td>
              <td>$89</td>
              <td>Cash</td>
              <td>
                <span className="badge badge-success">Paid</span>
              </td>
              <td>
                <button className="btn btn-xs btn-info">View</button>
              </td>
            </tr>
            <tr>
              <td>INV-1002</td>
              <td>Mary W.</td>
              <td>27-Jan-2026</td>
              <td>$15</td>
              <td>Card</td>
              <td>
                <span className="badge badge-success">Paid</span>
              </td>
              <td>
                <button className="btn btn-xs btn-info">View</button>
              </td>
            </tr>
            <tr>
              <td>INV-1003</td>
              <td>David K.</td>
              <td>26-Jan-2026</td>
              <td>$46</td>
              <td>Cash</td>
              <td>
                <span className="badge badge-warning">Pending</span>
              </td>
              <td>
                <button className="btn btn-xs btn-info">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
