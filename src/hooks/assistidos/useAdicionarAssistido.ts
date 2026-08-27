import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adicionarAssistido } from "../../services/listas";

export function useAdicionarAssistido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => {
      return adicionarAssistido(movieId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assistidos"],
      });

      queryClient.invalidateQueries({
        queryKey: ["filme"],
      });
    },
  });
}
