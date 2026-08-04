import { api } from "./api";
import type { Filme, Metadata } from "./filmes";

interface RespostaFavoritos {
  data: Filme[];
  metadata: Metadata;
}

interface FiltrosFavoritos {
  page?: number;
  perPage?: number;
  search?: string;
}

export async function listarFavoritos(filtros?: FiltrosFavoritos) {
  const response = await api.get<RespostaFavoritos>("/account/favorites", {
    params: filtros,
  });

  return response.data;
}
