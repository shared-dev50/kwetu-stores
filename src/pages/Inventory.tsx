import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id?: number;
  barcode: string;
  name: string;
  price: string | number;
  created_at?: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data: Product[];
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
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

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.barcode || !newProduct.price) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const payload = {
        ...newProduct,
        price: Number(newProduct.price),
      };

      const res = await axios.post<{ data: Product }>(
        "http://localhost:5001/api/products",
        payload,
      );

      const savedProduct = res.data.data;
      setProducts(prev => [...prev, savedProduct]);

      setNewProduct({
        barcode: "",
        name: "",
        price: "",
      });

      alert("Product added successfully!");
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to add product");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          "http://localhost:5001/api/products",
        );

        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory</h1>
      </div>

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
        <button className="btn btn-primary" onClick={addProduct}>
          Add Product
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
            {products.map(prod => (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>{prod.barcode}</td>
                <td>$ {prod.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
