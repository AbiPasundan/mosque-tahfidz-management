import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useDashboardCard = () => {
  return useQuery({
    queryKey: ["dashboardCard"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/dashboard/summary");

      return data;
    },
    retry: false,
  });
};