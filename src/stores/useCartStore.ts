import { create } from "zustand";
import APIClient from "../services/apiClient";
import type { CartItem } from "../entities/types";

interface CartState {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
  clearCart: () => void;
  isProcessing: boolean;
  processPayment: (method: "cash" | "card") => Promise<void>;
}

const stripeClient = new APIClient<{ url: string }>(
  "/api/payments/create-checkout-session",
);
const cashClient = new APIClient<{ message: string }>("/api/sales/cash");

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  isProcessing: false,

  addItem: newItem => {
    const { cart } = get();
    const existing = cart.find(i => i.product.id === newItem.product.id);

    if (existing) {
      set({
        cart: cart.map(i =>
          i.product.id === newItem.product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      });
    } else {
      set({ cart: [...cart, newItem] });
    }
  },

  removeItem: id =>
    set(state => ({
      cart: state.cart.filter(item => item.product.id !== id),
    })),

  updateQuantity: (id, amount) =>
    set(state => ({
      cart: state.cart.map(item =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    })),

  clearCart: () => set({ cart: [] }),

  processPayment: async method => {
    const { cart, clearCart } = get();
    if (cart.length === 0) return;

    set({ isProcessing: true });
    try {
      if (method === "card") {
        const response = await stripeClient.post<
          { items: CartItem[] },
          { url: string }
        >({
          items: cart,
        });
        console.log("Stripe URL received:", response.url);

        window.location.href = response.url;
      } else {
        await cashClient.post<{ items: CartItem[]; total: number }, unknown>({
          items: cart,
          total: cart.reduce(
            (sum, i) => sum + Number(i.product.price) * i.quantity,
            0,
          ),
        });

        alert("Cash sale completed successfully!");
        clearCart();
      }
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Check console for details.");
    } finally {
      set({ isProcessing: false });
    }
  },
}));
