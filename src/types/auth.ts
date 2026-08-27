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
