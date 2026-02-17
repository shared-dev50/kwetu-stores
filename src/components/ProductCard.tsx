import type { Product } from "../entities/types";
import { useCartStore } from "../stores/useCartStore"; // Import your store

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      product,
      quantity: 1,
    });
  };

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all border border-base-200">
      <div className="card-body p-4">
        <h2 className="font-semibold truncate">{product.name}</h2>
        <p className="text-xl font-bold text-primary">
          ${Number(product.price).toFixed(2)}
        </p>

        <div className="mt-2 flex justify-between items-center">
          <span className="badge badge-success badge-sm">In stock</span>
          <span className="text-xs opacity-50">SKU: {product.id}</span>
        </div>

        <div className="card-actions mt-4">
          <button className="btn btn-primary btn-sm w-full" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
