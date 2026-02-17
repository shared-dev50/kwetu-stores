import { useEffect, useRef, useState } from "react";
import useGetAllProducts from "../hooks/useGetAllProducts";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { useCartStore } from "../stores/useCartStore"; // Import your store

const Products = () => {
  const addItem = useCartStore(s => s.addItem);
  const { data: products } = useGetAllProducts();

  const [searchQuery, setSearchQuery] = useState("");

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

          if (foundProduct) {
            addItem({ product: foundProduct, quantity: 1 });
          }
          scanBufferRef.current = "";
        }
        return;
      }

      if (e.key.length === 1) {
        scanBufferRef.current += e.key;
        if (scanTimeout.current) clearTimeout(scanTimeout.current);
        scanTimeout.current = setTimeout(() => {
          scanBufferRef.current = "";
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [products, addItem]);

  // Filter the products based on the search query
  const filteredProducts = products?.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="h-full flex bg-base-200">
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {/* Toolbar */}
        <div className="flex items-center gap-4 bg-base-100 p-4 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="Search by name or scan barcode..."
            className="input input-bordered w-full max-w-md"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          <select className="select select-bordered hidden md:block">
            <option>All Categories</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts?.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}

          {filteredProducts?.length === 0 && (
            <div className="col-span-full text-center py-20 opacity-50">
              No products found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default Products;
