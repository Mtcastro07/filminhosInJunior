import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/header";
import Footer from "../../components/footer";

import { useAssistidos } from "../../hooks/useAssistidos";
import { useRemoverAssistido } from "../../hooks/useRemoverAssistido";

import "./watched.css";

export default function WatchedPage() {
  const [search, setSearch] = useState("");

  const { data, isError } = useAssistidos(search);

  const removerAssistido = useRemoverAssistido();

  const buscarFilme = "Pesquisar...";

  if (isError) {
    return <p>Erro ao carregar filmes assistidos.</p>;
  }

  return (
    <>
      <Header />

      <main className="assistidos-page">
        <h1 className="titulo-watched-list">Assistidos</h1>
        <div className="input-icon-watched">
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
            className="search-watched-list"
            type="text"
            placeholder={buscarFilme}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="watched-grid">
          {data?.data.map((filme) => (
            <div key={filme.id} className="watched-card">
              <Link className="watched-link" to={`/movies/${filme.id}`}>
                <img
                  className="watched-img-film"
                  src={filme.posterImageUrl ?? undefined}
                  alt={filme.title}
                />
              </Link>

              <button
                className="watched-remove"
                type="button"
                onClick={() => removerAssistido.mutate(filme.id)}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="64" height="64" rx="32" fill="#EF2027" />
                  <path
                    d="M17 32H47"
                    stroke="white"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
