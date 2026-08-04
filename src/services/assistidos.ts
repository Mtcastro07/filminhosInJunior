import { api } from "./api";
import type { Filme, Metadata } from "./filmes";

interface RespostaAssistidos {
  data: Filme[];
  metadata: Metadata;
}

interface FiltrosAssistidos {
  page?: number;
  perPage?: number;
  search?: string;
}

export async function listarAssistidos(filtros?: FiltrosAssistidos) {
  const response = await api.get<RespostaAssistidos>("/account/watched", {
    params: filtros,
  });

  return response.data;
}
