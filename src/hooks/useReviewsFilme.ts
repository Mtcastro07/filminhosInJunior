import { useQuery } from "@tanstack/react-query";
import { listarReviewsFilme } from "../services/filmes";

export function useReviewsFilme(movieId: number) {
  return useQuery({
    queryKey: ["reviews", movieId],

    queryFn: () => listarReviewsFilme(movieId),
  });
}
