import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data } = await api.post("/api/v1/auth/logout");
            return data;
        },

        onSuccess: () => {
            queryClient.clear();
        },
    });
};