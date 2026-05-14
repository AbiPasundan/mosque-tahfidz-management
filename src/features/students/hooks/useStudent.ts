import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useStudent = (id?: string) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      if (!id) throw new Error("Student ID is required");
      const { data } = await api.get(`/api/v1/students/${id}`);

      return data;
    },
    enabled: !!id,
    retry: false,
  });
};
