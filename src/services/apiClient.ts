import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

class APIClient<T> {
  endpoint: string;
  private axiosInstance: AxiosInstance;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:5001",
    });
  }

  getAll = async (config?: AxiosRequestConfig): Promise<T[]> => {
    try {
      const res = await this.axiosInstance.get<ApiResponse<T[]>>(
        this.endpoint,
        config,
      );
      return res.data.data;
    } catch {
      throw new Error("Failed to fetch products");
    }
  };

  addProduct = async (data: T): Promise<T> => {
    try {
      const res = await this.axiosInstance.post<ApiResponse<T>>(
        this.endpoint,
        data,
      );
      return res.data.data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to post data";
      throw new Error(message);
    }
  };
}

export default APIClient;
