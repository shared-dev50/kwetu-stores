import axios from "axios";
import CartPanel from "../components/Cart";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { CartItem, Product } from "../entities/types";

interface ApiResponse {
  status: number;
  message: string;
  data: Product[];
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
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
    <div className="h-full flex">
      <div className="flex-1 p-6 space-y-4">
        {/* <input type="text" autoFocus className="absolute" /> */}

        <div className="flex items-center gap-4">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <CartPanel cart={cart} setCart={setCart} />
    </div>
  );
};

export default Products;
