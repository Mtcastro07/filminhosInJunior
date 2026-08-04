import { Link } from "react-router-dom";
import type { Filme } from "../services/filmes";
import "../styles/CarrosselFilmes.css";
import { useState } from "react";

interface Props {
  filmes: Filme[];
}

export default function CarrosselFilmes({ filmes }: Props) {
  const [posicao, setPosicao] = useState(0);
  function moverDireita() {
    if (posicao < filmes.length - 1) {
      setPosicao(posicao + 1);
    }
  }

  function moverEsquerda() {
    if (posicao > 0) {
      setPosicao(posicao - 1);
    }
  }
  return (
    <section className="user-carousel">
      <button className="user-carousel-left" onClick={moverEsquerda}>
        <svg
          width="18"
          height="33"
          viewBox="0 0 18 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.1376 32.1365C17.0215 32.253 16.8836 32.3453 16.7317 32.4083C16.5799 32.4713 16.4171 32.5038 16.2526 32.5038C16.0882 32.5038 15.9254 32.4713 15.7736 32.4083C15.6217 32.3453 15.4838 32.253 15.3676 32.1365L0.367651 17.1366C0.251242 17.0204 0.158886 16.8825 0.0958691 16.7306C0.0328541 16.5788 0.000415802 16.416 0.000415802 16.2516C0.000415802 16.0871 0.0328541 15.9243 0.0958691 15.7725C0.158886 15.6206 0.251242 15.4827 0.367651 15.3666L15.3676 0.36655C15.6024 0.131832 15.9207 -2.67029e-05 16.2526 -2.67029e-05C16.5846 -2.67029e-05 16.9029 0.131832 17.1376 0.36655C17.3724 0.601267 17.5042 0.919611 17.5042 1.25155C17.5042 1.58349 17.3724 1.90183 17.1376 2.13655L3.02015 16.2516L17.1376 30.3665C17.2541 30.4827 17.3464 30.6206 17.4094 30.7725C17.4724 30.9243 17.5049 31.0871 17.5049 31.2515C17.5049 31.416 17.4724 31.5788 17.4094 31.7306C17.3464 31.8825 17.2541 32.0204 17.1376 32.1365Z"
            fill="#000000"
          />
        </svg>
      </button>
      <div className="user-carousel-viewport">
        <div
          className="user-carousel-track"
          style={{
            transform: `translateX(-${posicao * 240}px)`,
          }}
        >
          {filmes.map((filme) => (
            <Link
              key={filme.id}
              to={`/movies/${filme.id}`}
              className="user-carousel-card"
            >
              <img src={filme.posterImageUrl ?? undefined} alt={filme.title} />
            </Link>
          ))}
        </div>
      </div>
      <button className="user-carousel-right" onClick={moverDireita}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.6153 4.11504C11.7314 3.99863 11.8693 3.90627 12.0212 3.84326C12.1731 3.78024 12.3359 3.7478 12.5003 3.7478C12.6647 3.7478 12.8275 3.78024 12.9794 3.84326C13.1312 3.90627 13.2692 3.99863 13.3853 4.11504L28.3853 19.115C28.5017 19.2312 28.594 19.3691 28.6571 19.521C28.7201 19.6728 28.7525 19.8356 28.7525 20C28.7525 20.1645 28.7201 20.3273 28.6571 20.4791C28.594 20.631 28.5017 20.7689 28.3853 20.885L13.3853 35.885C13.1506 36.1198 12.8322 36.2516 12.5003 36.2516C12.1683 36.2516 11.85 36.1198 11.6153 35.885C11.3806 35.6503 11.2487 35.332 11.2487 35C11.2487 34.6681 11.3806 34.3498 11.6153 34.115L25.7328 20L11.6153 5.88504C11.4989 5.76892 11.4065 5.63098 11.3435 5.47912C11.2805 5.32726 11.248 5.16446 11.248 5.00004C11.248 4.83562 11.2805 4.67282 11.3435 4.52095C11.4065 4.36909 11.4989 4.23115 11.6153 4.11504Z"
            fill="#000000"
          />
        </svg>
      </button>
    </section>
  );
}
