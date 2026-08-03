import { api } from "./api";
import type { Filme, Metadata } from "./filmes";

interface RespostaListaFilmes {
  data: Filme[];
  metadata: Metadata;
}

interface FiltrosLista {
  page?: number;
  perPage?: number;
  search?: string;
}

export async function listarFavoritos(filtros?: FiltrosLista) {
  const response = await api.get<RespostaListaFilmes>("/account/favorites", {
    params: filtros,
  });

  return response.data;
}

export async function adicionarFavorito(movieId: number) {
  const response = await api.post("/account/favorites", {
    movieId,
  });

  return response.data;
}

export async function removerFavorito(movieId: number) {
  await api.delete(`/account/favorites/${movieId}`);
}

export async function listarAssistidos(filtros?: FiltrosLista) {
  const response = await api.get<RespostaListaFilmes>("/account/watched", {
    params: filtros,
  });

  return response.data;
}

export async function adicionarAssistido(movieId: number) {
  const response = await api.post("/account/watched", {
    movieId,
  });

  return response.data;
}

export async function removerAssistido(movieId: number) {
  await api.delete(`/account/watched/${movieId}`);
}
