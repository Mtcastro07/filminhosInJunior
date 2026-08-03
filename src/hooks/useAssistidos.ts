import { useQuery } from "@tanstack/react-query";
import { listarAssistidos } from "../services/listas";

export function useAssistidos(search: string = "") {
  return useQuery({
    queryKey: ["assistidos", search],

    queryFn: () =>
      listarAssistidos({
        search,
        perPage: 20,
      }),
  });
}
