import { useQuery } from "@tanstack/react-query";
import { buscarProfile } from "../services/auth";
import { useAuthStore } from "../stores/authStore";

export function useProfile() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["profile"],
    queryFn: buscarProfile,
    enabled: isAuthenticated,
  });
}
