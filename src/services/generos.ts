import { api } from "./api";
import type { genero } from "../types/generos";

export type { genero } from "../types/generos";

interface RespostaGeneros {
  data: genero[];
}

export async function listarGeneros() {
  const response = await api.get<RespostaGeneros>("/genres");

  return response.data.data;
}
