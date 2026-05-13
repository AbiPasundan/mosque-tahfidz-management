import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface ProgressFilters {
  student_id?: string;
  date?: string;
}

export const useProgress = (filters?: ProgressFilters) => {
  return useQuery({
    queryKey: ["progress", filters],
    queryFn: async () => {
      const { data } = await api.get("/progress", { params: filters });
      return data;
    },
    retry: false,
  });
};
