interface ProductCardProps {
  product: {
    barcode: string;
    name: string;
    price: string | number;
  };
  onAddToCart: (product: ProductCardProps["product"]) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg cursor-pointer">
      <div className="card-body p-4">
        <h2 className="font-semibold truncate">{product.name}</h2>

        <p className="text-xl font-bold">{product.price}</p>

        <div className="mt-2">
          <span className="badge badge-success">In stock</span>
        </div>
      </div>
      <button
        className="btn btn-primary mt-2"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
