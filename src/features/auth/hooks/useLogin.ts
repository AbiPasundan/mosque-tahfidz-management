import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    user: {
      email: string;
      name: string;
      role: 'admin' | 'teacher' | 'staff';
    };
    token: string;
  };
  message: string;
  success: boolean;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/login", payload);

      return data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
    onError: (error) => {
      // Ambil pesan error dari backend, atau gunakan pesan default
      const errorMessage = error.message || "Terjadi kesalahan saat login. Silakan coba lagi.";

      console.error("[Login Error]:", errorMessage);
      queryClient.clear();
    },
  });
};
