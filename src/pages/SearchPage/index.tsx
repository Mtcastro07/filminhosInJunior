import "./search.css";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { listarFilmes } from "../../services/filmes";
import type { Filme } from "../../services/filmes";
import { Link } from "react-router-dom";
import { listarGeneros } from "../../services/generos";
import type { genero } from "../../services/generos";

export default function searchPage() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [busca, setBusca] = useState("");
  const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [generos, setGeneros] = useState<genero[]>([]);

  function limparFiltros() {
    setBusca("");
    setGenerosSelecionados([]);
  }

  function selecionarGenero(id: number) {
    if (generosSelecionados.includes(id)) {
      setGenerosSelecionados(
        generosSelecionados.filter((generoId) => generoId !== id),
      );
    } else {
      setGenerosSelecionados([...generosSelecionados, id]);
    }
  }

  useEffect(() => {
    async function carregarFilmes() {
      const dados = await listarFilmes({
        q: busca,
        genreIds: generosSelecionados,
      });
      setFilmes(dados);
    }
    carregarFilmes();
  }, [busca, generosSelecionados]);

  useEffect(() => {
    async function carregarGeneros() {
      const dados = await listarGeneros();
      setGeneros(dados);
    }

    carregarGeneros();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="content-input-search-page">
          <svg
            className="input-icon-search-page"
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
            className="input-search-page"
            type="text"
            placeholder="Pesquisar..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          ></input>
        </div>
        <div className="buttons-addFilter">
          <button
            className="button-addFilter"
            onClick={() => setModalAberto(!modalAberto)}
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 17.5H32.5M17.5 2.5V32.5"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Adicionar Filtro
          </button>

          {generos
            .filter((genero) => generosSelecionados.includes(genero.id))
            .map((genero) => (
              <button
                className="button-filtragem"
                key={genero.id}
                onClick={() => selecionarGenero(genero.id)}
              >
                <svg
                  width="35"
                  height="5"
                  viewBox="0 0 35 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 2.5H32.5"
                    stroke="white"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {genero.name}
              </button>
            ))}
        </div>

        {modalAberto && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-buttons">
                <svg
                  className="buttons-quit-modal"
                  onClick={() => setModalAberto(!modalAberto)}
                  width="52"
                  height="45"
                  viewBox="0 0 52 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_165_604)">
                    <path
                      d="M4.5455 20.3218H48.8637C49.4514 20.3218 50.015 20.5557 50.4306 20.9721C50.8461 21.3885 51.0796 21.9533 51.0796 22.5422C51.0796 23.1311 50.8461 23.6958 50.4306 24.1122C50.015 24.5286 49.4514 24.7626 48.8637 24.7626H4.5455C3.9578 24.7626 3.39418 24.5286 2.97861 24.1122C2.56305 23.6958 2.32959 23.1311 2.32959 22.5422C2.32959 21.9533 2.56305 21.3885 2.97861 20.9721C3.39418 20.5557 3.9578 20.3218 4.5455 20.3218Z"
                      fill="black"
                    />
                    <path
                      d="M5.46303 22.5422L23.8418 40.9537C24.2579 41.3706 24.4916 41.9361 24.4916 42.5257C24.4916 43.1154 24.2579 43.6809 23.8418 44.0978C23.4257 44.5147 22.8614 44.7489 22.2729 44.7489C21.6845 44.7489 21.1201 44.5147 20.7041 44.0978L0.76087 24.1142C0.55451 23.908 0.390786 23.663 0.279076 23.3932C0.167365 23.1234 0.109863 22.8343 0.109863 22.5422C0.109863 22.2501 0.167365 21.961 0.279076 21.6912C0.390786 21.4214 0.55451 21.1764 0.76087 20.9702L20.7041 0.986609C21.1201 0.569678 21.6845 0.335449 22.2729 0.335449C22.8614 0.335449 23.4257 0.569678 23.8418 0.986609C24.2579 1.40354 24.4916 1.96902 24.4916 2.55865C24.4916 3.14828 24.2579 3.71376 23.8418 4.13069L5.46303 22.5422Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_165_604">
                      <rect width="52" height="45" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <svg
                  className="buttons-quit-modal"
                  onClick={() => setModalAberto(!modalAberto)}
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44.2751 0.732244C43.2989 -0.244081 41.7159 -0.244081 40.7396 0.732244L22.5036 18.9682L4.26777 0.732244C3.29147 -0.244081 1.70854 -0.244081 0.732244 0.732244C-0.244081 1.70854 -0.244081 3.29147 0.732244 4.26777L18.9681 22.5037L0.732294 40.7395C-0.244031 41.716 -0.244031 43.2987 0.732294 44.2752C1.70859 45.2515 3.29152 45.2515 4.26782 44.2752L22.5036 26.0392L40.7396 44.2752C41.7159 45.2515 43.2989 45.2515 44.2751 44.2752C45.2514 43.2987 45.2514 41.716 44.2751 40.7397L26.0391 22.5037L44.2751 4.26777C45.2514 3.29147 45.2514 1.70854 44.2751 0.732244Z"
                    fill="black"
                  />
                </svg>
              </div>
              <p className="modal-genre-p">Gênero:</p>
              <div className="modal-genres">
                {generos.map((genero) => (
                  <button
                    key={genero.id}
                    className={
                      generosSelecionados.includes(genero.id)
                        ? "button-genero-ativo"
                        : "button-genero-desativado"
                    }
                    onClick={() => selecionarGenero(genero.id)}
                  >
                    {generosSelecionados.includes(genero.id) ? (
                      <svg
                        width="35"
                        height="5"
                        viewBox="0 0 35 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 2.5H32.5"
                          stroke="white"
                          stroke-width="5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 17.5H32.5M17.5 2.5V32.5"
                          stroke="black"
                          stroke-width="5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}
                    {genero.name}
                  </button>
                ))}
              </div>
              <div className="modal-search-bottom-buttons">
                <button className="clear-search-button" onClick={limparFiltros}>
                  Apagar Todos os Filtros
                </button>
                <button
                  className="concluir-search-button"
                  onClick={() => setModalAberto(!modalAberto)}
                >
                  Concluir
                </button>
              </div>
            </div>
          </div>
        )}

        <ul className="cardsFilm-search-page">
          {filmes.map((filme) => (
            <li key={filme.id} className="cardFilm-searchPage-page">
              <Link to={`/movies/${filme.id}`}>
                <img className="" src={filme.posterImageUrl} />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
