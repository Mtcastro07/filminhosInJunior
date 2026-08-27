import { api } from "./api";
import type {
  filmeIndividual,
  filmeReview,
  Filme,
  Metadata,
  RespostaFilmes,
  FiltrosFilmes,
  RespostaFilmeDestaque,
  respostaFIlmeIndividual,
  respostaFilmeReview,
} from "../types/filmes";

export type {
  filmeIndividual,
  userReview,
  filmeReview,
  respostaFilmeReview,
  respostaFIlmeIndividual,
  generos,
  Filme,
  RespostaFilmeDestaque,
  Metadata,
  RespostaFilmes,
  FiltrosFilmes,
} from "../types/filmes";

export async function listarFilmes(filtros?: FiltrosFilmes) {
  const response = await api.get<RespostaFilmes>("/movies", {
    params: filtros,

    paramsSerializer: {
      indexes: false,
    },
  });

  return response.data.data;
}

export async function listarFilme(id: number) {
  const response = await api.get<respostaFIlmeIndividual>(`/movies/${id}`);
  return response.data.data;
}

export async function listarReviewsFilme(id: number) {
  const response = await api.get<respostaFilmeReview>("/reviews", {
    params: {
      movieId: id,
    },
  });

  return response.data.data;
}

export async function listarReviewsTotal() {
  const response = await api.get<respostaFilmeReview>("/reviews", {
    params: {
      perPage: 10,
    },
  });

  return response.data.data;
}

export async function listarFilmesDestaque(count: number) {
  const response = await api.get<RespostaFilmeDestaque>("/movies/featured", {
    params: { count: count },
  });
  return response.data.data;
}
