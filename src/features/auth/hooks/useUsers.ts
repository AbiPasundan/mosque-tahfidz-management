import { api } from "@/lib/api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export interface UserFilters {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export const useUsers = (filters?: UserFilters, options?: Partial<UseQueryOptions<any, Error>>) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/users", { params: filters });
      return data;
    },
    retry: false,
    ...options
  });
};
