import React from "react";
import type { CartItem } from "../entities/types";

interface CartPanelProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart = ({ cart, setCart }: CartPanelProps) => {
  const increase = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decrease = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <div className="w-80 border-l bg-base-100 p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Cart</h2>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          cart.map(item => (
            <div
              key={item.product.id}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × $ {item.product.price}
                </p>
              </div>

              <div className="flex gap-1">
                <button
                  className="btn btn-xs"
                  onClick={() => decrease(item.product.id!)}
                >
                  −
                </button>
                <button
                  className="btn btn-xs"
                  onClick={() => increase(item.product.id!)}
                >
                  +
                </button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => removeItem(item.product.id!)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>$ {total}</span>
        </div>

        <button
          className="btn btn-primary w-full mt-4"
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
