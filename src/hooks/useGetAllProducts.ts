import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Product } from "../entities/types";
import APIClient from "../services/apiClient";

// Initialize APIClient
const apiClient = new APIClient<Product>("/api/products");

const useGetAllProducts = (): UseQueryResult<Product[], Error> => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.getAll(),
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllProducts;
