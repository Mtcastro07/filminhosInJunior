import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removerFavorito } from "../../services/listas";

export function useRemoverFavorito() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removerFavorito,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoritos"],
      });
    },
  });
}
