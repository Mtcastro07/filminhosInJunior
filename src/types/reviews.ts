import type { Filme, Metadata, filmeReview } from "./filmes";

export interface RespostaMinhasReviews {
  data: filmeReview[];
  metadata: Metadata;
}

export interface UsuarioReview {
  id: number;
  fullName: string;
  avatarUrl: string | null;
  initials: string;
}

export interface Review {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;

  user: UsuarioReview;
  movie: Filme;
}

export interface DadosCriarReview {
  movieId: number;
  rating: number;
  text: string;
}

export interface DadosEditarReview {
  rating: number;
  text: string;
}
