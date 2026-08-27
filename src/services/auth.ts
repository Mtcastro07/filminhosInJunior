import { api } from "./api";
import type { Usuario, PerfilUsuario, DadosLogin, DadosCadastro } from "../types/auth";

export type { Usuario, PerfilUsuario, DadosLogin, DadosCadastro } from "../types/auth";

interface RespostaPerfil {
  data: PerfilUsuario;
}

interface RespostaProfile {
  data: Usuario;
}

interface RespostaAutenticacao {
  data: {
    token: string;
    user: Usuario;
  };
}

export async function login(dados: DadosLogin) {
  const response = await api.post<RespostaAutenticacao>("/auth/login", dados);

  return response.data.data;
}

export async function cadastrar(dados: DadosCadastro) {
  const response = await api.post<RespostaAutenticacao>("/auth/signup", dados);

  return response.data.data;
}

export async function buscarProfile() {
  const response = await api.get<RespostaProfile>("/account/profile");

  return response.data.data;
}

export async function buscarPerfil() {
  const response = await api.get<RespostaPerfil>("/account/profile");

  return response.data.data;
}

export async function logout() {
  await api.post("/account/logout");
}
