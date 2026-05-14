import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/students");

      return data;
    },
    retry: false,
  });
};