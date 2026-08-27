import { useEffect, useState } from "react";
import type { Filme } from "../types/filmes";
import { listarFilmesDestaque } from "../services/filmes";
import "../styles/HeroCarrossel.css";
import { Link } from "react-router-dom";

export default function HeroCarrossel() {
  const [filmesDestaques, setFilmesDestaques] = useState<Filme[]>([]);
  const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {
    async function carregarCarrosselHero() {
      const dados = await listarFilmesDestaque(4);
      setFilmesDestaques(dados);
    }

    carregarCarrosselHero();
  }, []);

  return (
    <>
      <main>
        <div className="hero-carousel">
          <div className="hero-viewport">
            <div
              className="hero-track"
              style={{
                transform: `translateX(
      calc(25vw - ${slideAtual} * (52vw + 10px))
    )`,
              }}
            >
              {filmesDestaques.map((filme) => (
                <div className="hero-slide" key={filme.id}>
                  <Link to={`/movies/${filme.id}`}>
                    <img
                      src={filme.posterImageUrl ?? undefined}
                      alt={filme.title}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-dots">
            {filmesDestaques.map((filme, index) => (
              <button
                key={filme.id}
                className="hero-dot-button"
                onClick={() => setSlideAtual(index)}
              >
                {slideAtual === index ? (
                  <svg
                    width="80"
                    height="34"
                    viewBox="0 0 80 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_58_108)">
                      <path
                        d="M5 13C5 7.47715 9.47715 3 15 3H61C66.5229 3 71 7.47715 71 13C71 18.5228 66.5228 23 61 23H15C9.47715 23 5 18.5228 5 13Z"
                        fill="#7189A7"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_58_108"
                        x="0"
                        y="0"
                        width="80"
                        height="34"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="2" dy="4" />
                        <feGaussianBlur stdDeviation="3.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_58_108"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_58_108"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_58_102)">
                      <circle cx="15" cy="13" r="10" fill="#7189A7" />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_58_102"
                        x="0"
                        y="0"
                        width="34"
                        height="34"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="2" dy="4" />
                        <feGaussianBlur stdDeviation="3.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_58_102"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_58_102"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
