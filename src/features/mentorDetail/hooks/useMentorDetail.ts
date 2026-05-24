import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { MentorDetailResponse } from "../types/mentor";

export const useMentorDetail = (id: string | undefined) => {
  return useQuery<MentorDetailResponse, Error>({
    queryKey: ["mentorDetail", id],
    queryFn: async () => {
      if (!id || id === "undefined") {
        throw new Error("Invalid mentor ID");
      }
      const { data } = await api.get(`/api/v1/mentors/${id}`);
      return data;
    },
    enabled: !!id && id !== "undefined",
  });
};
