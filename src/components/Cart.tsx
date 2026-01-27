const Cart = () => {
  return (
    <div className="w-80 border-l bg-base-100 p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Cart</h2>

      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Rice 5kg</p>
            <p className="text-sm text-gray-500">2 × 5</p>
          </div>

          <div className="flex gap-1">
            <button className="btn btn-xs">−</button>
            <button className="btn btn-xs">+</button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Sugar 2kg</p>
            <p className="text-sm text-gray-500">1 × 2</p>
          </div>

          <div className="flex gap-1">
            <button className="btn btn-xs">−</button>
            <button className="btn btn-xs">+</button>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>$12</span>
        </div>

        <button className="btn btn-primary w-full mt-4">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
