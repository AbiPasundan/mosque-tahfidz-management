import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteUserResponse, Error, string>({
    mutationFn: async (userId: string) => {
      const { data } = await api.delete(`/api/v1/users/${userId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["mentors"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardCard"] });
      queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
    },
  });
};
