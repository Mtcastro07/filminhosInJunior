import { useQuery } from "@tanstack/react-query";
import { listarMinhasReviews } from "../services/reviews";

export function useMinhasReviews() {
  return useQuery({
    queryKey: ["minhas-reviews"],
    queryFn: listarMinhasReviews,
  });
}
