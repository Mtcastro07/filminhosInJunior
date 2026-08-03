import { useQuery } from "@tanstack/react-query";
import { listarFavoritos } from "../services/listas";

export function useFavoritos(search: string = "") {
  return useQuery({
    queryKey: ["favoritos", search],

    queryFn: () =>
      listarFavoritos({
        search,
        perPage: 20,
      }),
  });
}
