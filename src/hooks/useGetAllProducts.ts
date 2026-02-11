import { useQuery } from "@tanstack/react-query";
import type { Product } from "../entities/types";
import APIClient from "../services/apiClient";
import { useAuthStore } from "../stores/useAuthStore";

// Initialize APIClient
const apiClient = new APIClient<Product>("/api/products");

const useGetAllProducts = () => {
  const token = useAuthStore(s => s.token);

  return useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.getAll(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: !!token,
  });
};

export default useGetAllProducts;
