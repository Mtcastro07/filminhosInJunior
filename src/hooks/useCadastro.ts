import { useMutation } from "@tanstack/react-query";
import { cadastrar } from "../services/auth";
import { useAuthStore } from "../stores/authStore";

export function useCadastro() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: cadastrar,

    onSuccess: (data) => {
      setAuth(data.token, data.user);
    },
  });
}
