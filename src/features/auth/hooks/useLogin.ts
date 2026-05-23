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
  const { setUser, setToken } = useAuthStore();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post("/api/v1/auth/login", payload);

      return data;
    },

    onSuccess: async (response) => {
      // Update global auth store
      // response is the full JSON body { success: true, data: { user, token } }
      if (response.success && response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
      }

      // Clear all cache to prevent data contamination from previous user
      queryClient.clear();
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
