import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";
import { useAuthStore } from "../stores/authStore";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      setAuth(data.token, data.user);
    },
  });
}
