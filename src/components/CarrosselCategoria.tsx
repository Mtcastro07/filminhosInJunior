import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarFilmes } from "../services/filmes";
import type { Filme } from "../types/filmes";
import "../styles/CarosselCategoria.css";

interface Props {
  generoId: number;
  titulo: string;
}

export default function CarrosselCategoria({ generoId, titulo }: Props) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [posicao, setPosicao] = useState(0);

  useEffect(() => {
    async function carregarFilmes() {
      const dados = await listarFilmes({
        genreIds: [generoId],
        perPage: 10,
      });

      setFilmes(dados);
    }

    carregarFilmes();
  }, [generoId]);

  function moverEsquerda() {
    if (posicao > 0) {
      setPosicao(posicao - 1);
    }
  }

  function moverDireita() {
    if (posicao < filmes.length - 1) {
      setPosicao(posicao + 1);
    }
  }

  return (
    <section className="carrossel-categoria">
      <h2 className="carrossel-titulo-categoria">{titulo}</h2>

      <div className="carrossel-titulo-categoria-borda"></div>

      <button
        className="categoria-seta categoria-seta-esquerda"
        onClick={moverEsquerda}
        disabled={posicao === 0}
      >
        <svg
          width="18"
          height="33"
          viewBox="0 0 18 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.1376 32.1365C17.0215 32.253 16.8836 32.3453 16.7317 32.4083C16.5799 32.4713 16.4171 32.5038 16.2526 32.5038C16.0882 32.5038 15.9254 32.4713 15.7736 32.4083C15.6217 32.3453 15.4838 32.253 15.3676 32.1365L0.367651 17.1366C0.251242 17.0204 0.158886 16.8825 0.0958691 16.7306C0.0328541 16.5788 0.000415802 16.416 0.000415802 16.2516C0.000415802 16.0871 0.0328541 15.9243 0.0958691 15.7725C0.158886 15.6206 0.251242 15.4827 0.367651 15.3666L15.3676 0.36655C15.6024 0.131832 15.9207 -2.67029e-05 16.2526 -2.67029e-05C16.5846 -2.67029e-05 16.9029 0.131832 17.1376 0.36655C17.3724 0.601267 17.5042 0.919611 17.5042 1.25155C17.5042 1.58349 17.3724 1.90183 17.1376 2.13655L3.02015 16.2516L17.1376 30.3665C17.2541 30.4827 17.3464 30.6206 17.4094 30.7725C17.4724 30.9243 17.5049 31.0871 17.5049 31.2515C17.5049 31.416 17.4724 31.5788 17.4094 31.7306C17.3464 31.8825 17.2541 32.0204 17.1376 32.1365Z"
            fill="#000000"
          />
        </svg>
      </button>

      <div className="carrossel-categoria-viewport">
        <div
          className="carrossel-categoria-track"
          style={{
            transform: `translateX(-${posicao * 240}px)`,
          }}
        >
          {filmes.map((filme) => (
            <Link
              key={filme.id}
              to={`/movies/${filme.id}`}
              className="carrossel-categoria-card"
            >
              <img src={filme.posterImageUrl ?? undefined} alt={filme.title} />
            </Link>
          ))}
        </div>
      </div>

      <button
        className="categoria-seta categoria-seta-direita"
        onClick={moverDireita}
        disabled={posicao >= filmes.length - 1}
      >
        <svg
          width="18"
          height="33"
          viewBox="0 0 18 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.367234 0.367235C0.483348 0.250827 0.621287 0.158469 0.77315 0.0954533C0.925012 0.0324371 1.08782 0 1.25223 0C1.41665 0 1.57946 0.0324371 1.73132 0.0954533C1.88318 0.158469 2.02112 0.250827 2.13723 0.367235L17.1372 15.3672C17.2536 15.4833 17.346 15.6213 17.409 15.7732C17.472 15.925 17.5045 16.0878 17.5045 16.2522C17.5045 16.4167 17.472 16.5795 17.409 16.7313C17.346 16.8832 17.2536 17.0211 17.1372 17.1372L2.13723 32.1372C1.90252 32.372 1.58417 32.5038 1.25223 32.5038C0.920295 32.5038 0.60195 32.372 0.367234 32.1372C0.132517 31.9025 0.000654459 31.5842 0.000654459 31.2522C0.000654459 30.9203 0.132517 30.6019 0.367234 30.3672L14.4847 16.2522L0.367234 2.13723C0.250826 2.02112 0.158468 1.88318 0.0954521 1.73132C0.0324359 1.57946 0 1.41665 0 1.25223C0 1.08782 0.0324359 0.925013 0.0954521 0.773151C0.158468 0.621288 0.250826 0.483349 0.367234 0.367235Z"
            fill="#000000"
          />
        </svg>
      </button>
    </section>
  );
}
