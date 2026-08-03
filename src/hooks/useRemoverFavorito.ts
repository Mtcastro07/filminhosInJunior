import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removerFavorito } from "../services/listas";

export function useRemoverFavorito() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => {
      return removerFavorito(movieId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoritos"],
      });

      queryClient.invalidateQueries({
        queryKey: ["filme"],
      });
    },
  });
}
