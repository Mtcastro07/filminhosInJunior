import { Link } from "react-router-dom";
import type { Filme } from "../services/filmes";
import "../styles/CarrosselFilmes.css";

interface Props {
  filmes: Filme[];
}

export default function CarrosselFilmes({ titulo, filmes }: Props) {
  return (
    <section className="user-carousel">
      <div className="user-carousel-viewport">
        <div className="user-carousel-track">
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
    </section>
  );
}
