import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useDashboardCard = () => {
  return useQuery({
    queryKey: ["dashboardCard"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/summary");

      return data;
    },
    retry: false,
  });
};