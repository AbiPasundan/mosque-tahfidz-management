import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface ActivityLog {
  id: string;
  user_id?: string;
  user_name: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  description: string;
  created_at: string;
}

export interface ActivityLogsFilters {
  page?: number;
  limit?: number;
}

export const useActivityLogs = (filters?: ActivityLogsFilters, options?: any) => {
  return useQuery({
    queryKey: ["activityLogs", filters],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/activity-logs", { params: filters });
      return data;
    },
    retry: false,
    ...options
  });
};
