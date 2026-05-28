import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const { logout } = useAuthStore();

    return useMutation({
        mutationFn: async () => {
            const { data } = await api.post("/api/v1/auth/logout");
            return data;
        },

        onSuccess: () => {
            // Clear user info from store & localStorage
            logout();
            queryClient.clear();
        },
    });
};