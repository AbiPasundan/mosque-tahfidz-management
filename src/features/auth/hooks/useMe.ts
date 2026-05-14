import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/auth/me");

      return data;
    },
    retry: false,
  });
};