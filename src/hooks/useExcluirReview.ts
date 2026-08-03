import { useMutation, useQueryClient } from "@tanstack/react-query";
import { excluirReview } from "../services/reviews";

export function useExcluirReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: excluirReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["minhas-reviews"],
      });
    },
  });
}
