import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateMentorFormValues } from "@/validations/mentor";

export interface CreateMentorResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const useCreateMentor = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateMentorResponse, Error, CreateMentorFormValues>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/api/v1/users", payload);
      return data;
    },
    onSuccess: () => {
      // Invalidate mentor-related queries so lists refresh
      queryClient.invalidateQueries({ queryKey: ["mentors"] });
    },
  });
};
