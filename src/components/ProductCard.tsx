const ProductCard = () => {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg cursor-pointer">
      <div className="card-body p-4">
        <h2 className="font-semibold truncate">Rice 5kg</h2>

        <p className="text-xl font-bold">$5</p>

        <div className="mt-2">
          <span className="badge badge-success">In stock</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
