import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adicionarFavorito } from "../../services/listas";

export function useAdicionarFavorito() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => {
      return adicionarFavorito(movieId);
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
