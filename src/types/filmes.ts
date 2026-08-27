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

export interface filmeIndividual {
  id: number;
  title: string;
  synopsis: string;
  posterImageUrl?: string | null;
  bannerImageUrl?: string | null;
  releaseYear: number;
  durationMinutes: number;
  ageRating: number | string;
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

export interface RespostaFilmeDestaque {
  data: Filme[];
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
