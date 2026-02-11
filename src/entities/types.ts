export interface Product {
  id?: number;
  barcode: string;
  name: string;
  price: string | number;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  role: "cashier" | "manager";
}

export interface LoginCredentials {
  name: string;
  pin: string;
}
