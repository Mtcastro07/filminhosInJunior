import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarReview } from "../../services/reviews";

export function useCriarReview(movieId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: criarReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", movieId],
      });
    },
  });
}
