import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";


export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    user: {
      email: string;
      name: string;
      role: 'admin' | 'mentor' | 'student';
    };
    token: string;
  };
  message: string;
  success: boolean;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post("/api/v1/auth/login", payload);

      return data;
    },

    onSuccess: async (response) => {
      // Update global auth store
      // We only store user info for UI display
      // Token is handled securely via HttpOnly cookie
      if (response.success && response.data) {
        setUser(response.data.user);
      }

      // Clear all cache to prevent data contamination from previous user
      queryClient.clear();
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },





    onError: (error) => {
      const errorMessage = error.message || "Terjadi kesalahan saat login. Silakan coba lagi.";

      console.error("[Login Error]:", errorMessage);
      queryClient.clear();
    },
  });
};
