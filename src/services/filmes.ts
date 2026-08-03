import { api } from "./api";

export interface filmeIndividual {
  id: number;
  title: string;
  synopsis: string;
  posterImageUrl?: string | null;
  bannerImageUrl?: string | null;
  releaseYear: number;
  durationMinutes: number;
  ageRating: number;
  contentWarning: string;
  cast: string;
  createdAt: string;
  updatedAt: string;
  avgRating?: string | null;
  reviewCount: number;
  isFavorite: boolean;
  isWatched: boolean;
  genres: generos[];
}

export interface userReview {
  id: number;
  fullName: string;
  avatarUrl: string;
  initials: string;
}

export interface filmeReview {
  id: number;
  rating: number;
  text: string | null;
  createdAt: string;
  updatedAt: string;

  user: userReview;
  movie: Filme;
}

export interface respostaFilmeReview {
  data: filmeReview[];
}

export interface respostaFIlmeIndividual {
  data: filmeIndividual;
}

export interface generos {
  id?: number;
  name: string;
}

export interface Filme {
  id: number;
  title: string;
  posterImageUrl: string | null;
  releaseYear: number;
  genres: generos[];
}

export interface RespostaFilmeDestaque {
  data: Filme[];
}

export interface Metadata {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  nextPage: number;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface RespostaFilmes {
  data: Filme[];
  metadata: Metadata;
}

export interface FiltrosFilmes {
  q?: string;
  genreIds?: number[];
  page?: number;
  perPage?: number;
}

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
