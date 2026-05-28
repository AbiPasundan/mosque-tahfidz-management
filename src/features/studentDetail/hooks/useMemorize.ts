import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  MemorizeRecord,
  CreateMemorizePayload,
  UpdateMemorizeStatusPayload,
  BulkUpdateMemorizeStatusPayload,
} from "../types/memorize";

export interface MemorizeFilters {
  student_id?: string;
  surah?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const useMemorize = (filters?: MemorizeFilters) => {
  return useQuery({
    queryKey: ["memorize", filters],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/memorize", { params: filters });
      return data; // contains success: boolean, message: string, data: MemorizeRecord[], meta: PaginationMeta
    },
    retry: false,
    enabled: !!filters?.student_id,
  });
};

export const useStudentSurahDetail = (studentId: string, surahNumber: number) => {
  return useQuery({
    queryKey: ["studentSurahDetail", studentId, surahNumber],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/students/${studentId}/memorize/surah/${surahNumber}`);
      return data.data as MemorizeRecord[];
    },
    enabled: !!studentId && !!surahNumber,
    retry: false,
  });
};

export const useCreateMemorize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateMemorizePayload) => {
      const { data } = await api.post("/api/v1/memorize", payload);
      return data.data as MemorizeRecord;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorize"] });
      queryClient.invalidateQueries({ queryKey: ["studentSurahDetail"] });
    },
  });
};

export const useUpdateMemorizeStatus = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateMemorizeStatusPayload) => {
      const { data } = await api.patch(`/api/v1/memorize/${id}/status`, payload);
      return data.data as MemorizeRecord;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorize"] });
      queryClient.invalidateQueries({ queryKey: ["studentSurahDetail"] });
    },
  });
};

export const useBulkUpdateMemorizeStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: BulkUpdateMemorizeStatusPayload) => {
      const { data } = await api.patch("/api/v1/memorize/bulk-status", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorize"] });
      queryClient.invalidateQueries({ queryKey: ["studentSurahDetail"] });
    },
  });
};

export const useDeleteMemorize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/api/v1/memorize/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memorize"] });
      queryClient.invalidateQueries({ queryKey: ["studentSurahDetail"] });
    },
  });
};
