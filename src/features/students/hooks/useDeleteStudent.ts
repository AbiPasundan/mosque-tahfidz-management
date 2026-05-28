import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface DeleteStudentResponse {
  success: boolean;
  message: string;
}

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteStudentResponse, Error, string>({
    mutationFn: async (studentId: string) => {
      const { data } = await api.delete(`/api/v1/students/${studentId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardCard"] });
      queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
    },
  });
};
