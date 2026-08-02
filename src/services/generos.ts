import { api } from "./api";

export interface genero {
  id: number;
  name: string;
}

interface RespostaGeneros {
  data: genero[];
}

export async function listarGeneros() {
  const response = await api.get<RespostaGeneros>("/genres");

  return response.data.data;
}
