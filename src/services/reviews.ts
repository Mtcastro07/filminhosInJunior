import { api } from "./api";
import type { Filme, Metadata, filmeReview } from "../types/filmes";
import type { DadosCriarReview, DadosEditarReview, Review, UsuarioReview, RespostaMinhasReviews } from "../types/reviews";

export type { RespostaMinhasReviews, UsuarioReview, Review, DadosCriarReview, DadosEditarReview } from "../types/reviews";

interface RespostaReview {
  data: Review;
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
