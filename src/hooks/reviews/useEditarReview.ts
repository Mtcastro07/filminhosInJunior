import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editarReview } from "../../services/reviews";

export function useEditarReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      rating,
      text,
    }: {
      reviewId: number;
      rating: number;
      text: string;
    }) => {
      return editarReview(reviewId, {
        rating,
        text,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["minhas-reviews"],
      });
    },
  });
}
