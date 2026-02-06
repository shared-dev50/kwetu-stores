import CartPanel from "../components/Cart";
import ProductCard from "../components/ProductCard";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CartItem, Product } from "../entities/types";
import useGetAllProducts from "../hooks/useGetAllProducts";

const Products = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const { data: products } = useGetAllProducts();

  const handleAddToCart = useCallback((product: Product) => {
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
  }, []);

  // BARCODE SCANNING LOGIC
  const scanBufferRef = useRef("");
  const scanTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      )
        return;

      if (e.key === "Enter") {
        if (scanBufferRef.current.length > 0) {
          const foundProduct = products?.find(
            p => p.barcode === scanBufferRef.current,
          );
          if (foundProduct) handleAddToCart(foundProduct);
          scanBufferRef.current = "";
        }
        if (scanTimeout.current) clearTimeout(scanTimeout.current);
        return;
      }

      if (e.key.length === 1) {
        scanBufferRef.current += e.key;

        if (scanTimeout.current) clearTimeout(scanTimeout.current);

        scanTimeout.current = setTimeout(() => {
          scanBufferRef.current = "";
        }, 2000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (scanTimeout.current) clearTimeout(scanTimeout.current);
    };
  }, [products, handleAddToCart]);

  return (
    <div className="h-full flex">
      <div className="flex-1 p-6 space-y-4">
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
          {products?.map(prod => (
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
