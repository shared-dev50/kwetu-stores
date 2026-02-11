import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../entities/types";
import APIClient, { type ApiResponse } from "../services/apiClient";
import type { AxiosError } from "axios";

const apiClient = new APIClient<Product>("/api/products");
const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: Product) => apiClient.addProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: AxiosError<ApiResponse<Product>>) => {
      const serverMessage = error.response?.data?.message || error.message;
      alert(`Error: ${serverMessage}`);
    },
  });
};
export default useAddProduct;
