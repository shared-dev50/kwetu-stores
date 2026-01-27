import CartPanel from "../components/Cart";
import ProductCard from "../components/ProductCard";

const Products = () => {
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      <CartPanel />
    </div>
  );
};

export default Products;
