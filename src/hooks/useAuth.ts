import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "../stores/useAuthStore";
import APIClient from "../services/apiClient";
import type { LoginCredentials } from "../entities/types";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: "cashier" | "manager";
  };
  message?: string;
}

interface RegisterData extends LoginCredentials {
  role: string;
}

const loginClient = new APIClient("/api/auth/login");
const registerClient = new APIClient("/api/auth/register");

export const useAuth = () => {
  const setAuth = useAuthStore(s => s.setAuth);

  const loginMutation = useMutation<
    AuthResponse,
    AxiosError<{ message: string }>,
    LoginCredentials
  >({
    mutationFn: credentials =>
      loginClient.post<LoginCredentials, AuthResponse>(credentials),
    onSuccess: data => {
      setAuth(data.user, data.token);
    },
  });

  const registerMutation = useMutation<
    AuthResponse,
    AxiosError<{ message: string }>,
    RegisterData
  >({
    mutationFn: userData =>
      registerClient.post<RegisterData, AuthResponse>(userData),
    onSuccess: data => {
      setAuth(data.user, data.token);
    },
  });

  return { loginMutation, registerMutation };
};
