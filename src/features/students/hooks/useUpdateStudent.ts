import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Student } from "../types/student";

export interface UpdateStudentPayload {
  name?: string;
  username?: string;
  password?: string;
  profile_img?: string;
  cover_img?: string;
  age?: number;
  learning_level?: string;
  fluency?: string;
  status?: string;
  contact?: string;
}

export interface UpdateStudentResponse {
  success: boolean;
  message: string;
  data: Student;
}

export const useUpdateStudent = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateStudentResponse, Error, UpdateStudentPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.put(`/api/v1/students/${studentId}`, payload);
      return data;
    },
    onSuccess: (response) => {
      // Invalidate queries so that tables, summaries and details refresh
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", studentId] });
      queryClient.invalidateQueries({ queryKey: ["dashboardCard"] });
      queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
    },
  });
};
