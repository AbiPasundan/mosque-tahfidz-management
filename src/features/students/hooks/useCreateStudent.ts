import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateStudentFormValues } from "@/validations/student";

export interface CreateStudentResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    age: number;
    learning_level: string;
    contact: string;
    status: string;
  };
}

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateStudentResponse, Error, CreateStudentFormValues>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/api/v1/students", payload);
      return data;
    },
    onSuccess: () => {
      // Invalidate student-related queries so list views refresh
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardCard"] });
    },
  });
};
