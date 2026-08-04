import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/header";
import Footer from "../../components/footer";

import { useFavoritos } from "../../hooks/useFavoritos";
import { useRemoverFavorito } from "../../hooks/useRemoverFavorito";
import "./liked.css";

export default function FavoritosPage() {
  const [search, setSearch] = useState("");

  const { data, isError } = useFavoritos(search);

  const removerFavorito = useRemoverFavorito();

  if (isError) {
    return <p>Erro ao carregar favoritos.</p>;
  }

  return (
    <>
      <Header />

      <main className="favoritos-page">
        <h1 className="titulo-liked-list">Curtidos</h1>
        <div className="input-icon-liked-list">
          <svg
            className="icon-seach-watched-list"
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6693 26.6987L36.5 36.5M30.8333 16.6667C30.8333 24.4906 24.4906 30.8333 16.6667 30.8333C8.84262 30.8333 2.5 24.4906 2.5 16.6667C2.5 8.84262 8.84262 2.5 16.6667 2.5C24.4906 2.5 30.8333 8.84262 30.8333 16.6667Z"
              stroke="black"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input
            className="search-liked-list"
            type="text"
            placeholder="Buscar filme..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="liked-grid">
          {data?.data.map((filme) => (
            <div key={filme.id} className="liked-card">
              <Link className="liked-link" to={`/movies/${filme.id}`}>
                <img
                  className="liked-img-film"
                  src={filme.posterImageUrl ?? undefined}
                  alt={filme.title}
                />
              </Link>

              <button
                className="liked-remove"
                type="button"
                onClick={() => removerFavorito.mutate(filme.id)}
                disabled={removerFavorito.isPending}
              >
                <svg
                  width="64"
                  height="57"
                  viewBox="0 0 64 57"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M64 17.0018C64 7.61195 56.2804 0 46.758 0C40.4889 0 35.0177 3.31024 31.9999 8.24404C28.982 3.31024 23.511 0 17.2418 0C7.71943 0 0 7.61195 0 17.0018C0 19.1483 0.42038 21.1935 1.15638 23.0847C6.85762 39.2552 32.0001 57 32.0001 57C32.0001 57 57.1424 39.2552 62.8438 23.0847C63.5798 21.1937 64 19.1483 64 17.0018Z"
                    fill="#FE0000"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
