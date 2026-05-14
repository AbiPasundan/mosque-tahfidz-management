import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { Mentor } from "../types/mentor";

export const useMentors = () => {
  return useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/users");
      // Backend returns all users, we filter to get mentors
      const mentors = data?.data?.filter((user: Mentor) => user.role === 'mentor') || [];
      return mentors as Mentor[];
    },
    retry: false,
  });
};
