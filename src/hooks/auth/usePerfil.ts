import { useQuery } from "@tanstack/react-query";
import { buscarPerfil } from "../../services/auth";

export function usePerfil() {
  return useQuery({
    queryKey: ["perfil"],
    queryFn: buscarPerfil,
  });
}
