import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { listarFilmes } from "../../services/filmes";
import type { Filme } from "../../services/filmes";
import { Link } from "react-router-dom";

export default function searchPage() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  useEffect(() => {
    async function carregarFilmes() {
      const dados = await listarFilmes();
      setFilmes(dados);
    }
    carregarFilmes();
  }, []);

  return (
    <>
      <Header />
      <main>Search Page</main>
      <ul>
        {filmes.map((filme) => (
          <li key={filme.id} className="cardFilm">
            <Link to={`/movies/${filme.id}`}>
              <img className="" src={filme.posterImageUrl} />
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  );
}
