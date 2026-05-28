import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface StudentFilters {
  search?: string;
  status?: string;
  learning_level?: string;
  page?: number;
  limit?: number;
}

export const useStudents = (filters?: StudentFilters) => {
  return useQuery({
    queryKey: ["students", filters],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/students", { params: filters });
      return data;
    },
    retry: 2,
  });
};