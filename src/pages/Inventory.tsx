import { useState } from "react";
import useGetAllProducts from "../hooks/useGetAllProducts";
import useAddProduct from "../hooks/useAddProduct";

interface Product {
  id?: number;
  barcode: string;
  name: string;
  price: number;
  created_at?: string;
}

const Inventory = () => {
  const { data: products, isLoading, error } = useGetAllProducts();
  const { mutate, isPending } = useAddProduct();

  const [newProduct, setNewProduct] = useState({
    barcode: "",
    name: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const { name, barcode, price } = newProduct;

    if (!name || !barcode || !price) {
      alert("Please fill in all fields");
      return;
    }

    const payload: Product = {
      name,
      barcode,
      price: Number(price),
    };

    mutate(payload, {
      onSuccess: () => {
        alert("Product added successfully!");
        setNewProduct({ barcode: "", name: "", price: "" });
      },
      onError: err => {
        alert(err.message || "Failed to add product");
      },
    });
  };

  if (isLoading) return <div className="p-6">Loading inventory...</div>;
  if (error)
    return <div className="p-6 text-error">Error: {error.message}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Inventory</h1>

      <div className="flex gap-2 mt-4 flex-wrap">
        <input
          type="text"
          name="barcode"
          placeholder="Barcode"
          value={newProduct.barcode}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          className="input input-bordered"
        />

        <button
          className="btn btn-primary"
          onClick={handleAddProduct}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Product"}
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Barcode</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products?.map(prod => (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>{prod.barcode}</td>
                <td>$ {Number(prod.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
