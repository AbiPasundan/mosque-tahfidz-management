import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateProfilePayload {
  name: string;
  email: string;
}

export interface UpdatePasswordPayload {
  old_password: string;
  new_password: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const { data } = await api.patch("/api/v1/auth/profile", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (payload: UpdatePasswordPayload) => {
      const { data } = await api.patch("/api/v1/auth/password", payload);
      return data;
    },
  });
};
