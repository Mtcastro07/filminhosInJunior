import { api } from "./api";

export interface Usuario {
  id: number;
  fullName: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
  initials: string;
}

export interface PerfilUsuario {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  initials: string;
}

interface RespostaPerfil {
  data: PerfilUsuario;
}

export interface DadosLogin {
  email: string;
  password: string;
}

export interface DadosCadastro {
  fullName?: string | null;
  email: string;
  password: string;
  passwordConfirmation: string;
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
