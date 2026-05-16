import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface ProgressFilters {
  student_id?: string;
  date?: string;
}

export interface CreateProgressPayload {
  student_id: string;
  surah: string;
  ayat_start: number;
  ayat_end: number;
  status: string;
  notes?: string;
  mentor_name?: string;
}

export interface BulkCreateProgressPayload {
  items: CreateProgressPayload[];
}

export const useProgress = (filters?: ProgressFilters) => {
  return useQuery({
    queryKey: ["progress", filters],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/progress", { params: filters });
      return data;
    },
    retry: false,
  });
};

export const useSurahs = () => {
  return useQuery({
    queryKey: ["surahs"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/surahs");
      return data.data;
    },
    staleTime: Infinity,
  });
};

export const useCreateProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateProgressPayload) => {
      const { data } = await api.post("/api/v1/progress", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardCard"] });
    },
  });
};

export const useBulkCreateProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: BulkCreateProgressPayload) => {
      const { data } = await api.post("/api/v1/progress/bulk", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardCard"] });
    },
  });
};
