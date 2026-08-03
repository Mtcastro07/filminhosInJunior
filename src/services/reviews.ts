import { api } from "./api";
import type { Filme, Metadata } from "./filmes";
import type { filmeReview } from "./filmes";

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

interface RespostaReview {
  data: Review;
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

export async function criarReview(dados: DadosCriarReview) {
  const response = await api.post<RespostaReview>("/reviews", dados);

  return response.data.data;
}

export async function editarReview(id: number, dados: DadosEditarReview) {
  const response = await api.put<RespostaReview>(`/reviews/${id}`, dados);

  return response.data.data;
}

export async function excluirReview(id: number) {
  await api.delete(`/reviews/${id}`);
}

export async function listarMinhasReviews() {
  const response = await api.get<RespostaMinhasReviews>("/account/reviews", {
    params: {
      perPage: 20,
    },
  });

  return response.data.data;
}
