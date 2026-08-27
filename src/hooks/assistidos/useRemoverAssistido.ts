import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removerAssistido } from "../../services/listas";

export function useRemoverAssistido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => {
      return removerAssistido(movieId);
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
