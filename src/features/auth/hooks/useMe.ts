import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export const useMe = () => {
  const { setUser } = useAuthStore();

  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/auth/me");

      return data;
    },
    retry: false,
  });

  useEffect(() => {
    if (query.data?.data) {
      setUser(query.data.data);
    }
  }, [query.data, setUser]);

  return query;
};
