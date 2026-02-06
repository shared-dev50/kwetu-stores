import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../entities/types";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<Product>("/api/products");
const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: Product) => apiClient.addProduct(newProduct),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      console.error("Mutation Error:", error.message);
    },
  });
};

export default useAddProduct;
