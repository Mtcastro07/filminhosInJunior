import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/auth";
import { useAuthStore } from "../stores/authStore";

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      clearAuth();
    },
  });
}
