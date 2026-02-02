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
