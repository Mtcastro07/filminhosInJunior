import "./individual.css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import { listarFilme } from "../../services/filmes";
import { useEffect, useState } from "react";
import type { filmeIndividual } from "../../services/filmes";
import type { filmeReview } from "../../services/filmes";
import { listarReviewsFilme } from "../../services/filmes";
import ModalReview from "../../components/ModalReview";
import { useAdicionarFavorito } from "../../hooks/useAdicionarFavorito";
import { useRemoverFavorito } from "../../hooks/useRemoverFavorito";
import { useAdicionarAssistido } from "../../hooks/useAdicionarAssistido";
import { useRemoverAssistido } from "../../hooks/useRemoverAssistido";

export function IndividualPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const { id } = useParams();
  const [filme, setFilme] = useState<filmeIndividual | null>(null);
  const [reviews, setReviews] = useState<filmeReview[] | null>(null);

  const adicionarFavorito = useAdicionarFavorito();
  const removerFavorito = useRemoverFavorito();

  const adicionarAssistido = useAdicionarAssistido();
  const removerAssistido = useRemoverAssistido();

  let classeRating = "age-rating";

  if (filme?.ageRating == "L") {
    classeRating += " livre";
  } else if (filme?.ageRating == 10) {
    classeRating += " dez-anos";
  } else if (filme?.ageRating == 12) {
    classeRating += " doze-anos";
  } else if (filme?.ageRating == 14) {
    classeRating += " quatorze-anos";
  } else if (filme?.ageRating == 16) {
    classeRating += " dezesseis-anos";
  } else if (filme?.ageRating == 18) {
    classeRating += " dezoito-anos";
  }

  function handleFavorito() {
    if (!filme) return;

    if (filme.isFavorite) {
      removerFavorito.mutate(filme.id, {
        onSuccess: () => {
          setFilme({
            ...filme,
            isFavorite: false,
          });
        },
      });
    } else {
      adicionarFavorito.mutate(filme.id, {
        onSuccess: () => {
          setFilme({
            ...filme,
            isFavorite: true,
          });
        },
      });
    }
  }

  function handleAssistido() {
    if (!filme) return;

    if (filme.isWatched) {
      removerAssistido.mutate(filme.id, {
        onSuccess: () => {
          setFilme({
            ...filme,
            isWatched: false,
          });
        },
      });
    } else {
      adicionarAssistido.mutate(filme.id, {
        onSuccess: () => {
          setFilme({
            ...filme,
            isWatched: true,
          });
        },
      });
    }
  }

  useEffect(() => {
    async function carregarFilme() {
      try {
        const data = await listarFilme(Number(id));
        console.log(data);
        setFilme(data);
      } catch (erro) {
        console.error("Erro na requisição do filme");
      }
    }
    carregarFilme();
  }, [id]);

  useEffect(() => {
    async function carregarReviews() {
      try {
        const data = await listarReviewsFilme(Number(id));
        setReviews(data);
      } catch (erro) {
        console.error("Erro na requisição das reviews do filme");
      }
    }

    carregarReviews();
  }, [id]);

  if (!filme) {
    return <p>Carregando...</p>;
  }

  function ratingByUsers(rate: number, prop: any) {
    if (prop.avgRating != null && Number(prop.avgRating) >= rate) {
      return (
        <svg
          width="69"
          height="65"
          viewBox="0 0 69 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.1134 0.690965C33.4128 -0.230345 34.7162 -0.230344 35.0155 0.690967L42.3715 23.3303C42.5053 23.7423 42.8893 24.0213 43.3225 24.0213H67.1269C68.0956 24.0213 68.4984 25.2609 67.7147 25.8303L48.4566 39.8222C48.1061 40.0768 47.9594 40.5282 48.0933 40.9402L55.4492 63.5795C55.7486 64.5008 54.6941 65.2669 53.9104 64.6975L34.6522 50.7057C34.3018 50.451 33.8272 50.451 33.4767 50.7057L14.2185 64.6975C13.4348 65.2669 12.3803 64.5008 12.6797 63.5795L20.0356 40.9402C20.1695 40.5282 20.0228 40.0768 19.6724 39.8222L0.414202 25.8303C-0.369512 25.2609 0.0332651 24.0213 1.00199 24.0213H24.8064C25.2396 24.0213 25.6236 23.7423 25.7574 23.3303L33.1134 0.690965Z"
            fill="#14AE5C"
          />
        </svg>
      );
    } else {
      return (
        <svg
          width="69"
          height="65"
          viewBox="0 0 69 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.1134 0.690965C33.4128 -0.230345 34.7162 -0.230344 35.0155 0.690967L42.3715 23.3303C42.5053 23.7423 42.8893 24.0213 43.3225 24.0213H67.1269C68.0956 24.0213 68.4984 25.2609 67.7147 25.8303L48.4566 39.8222C48.1061 40.0768 47.9594 40.5282 48.0933 40.9402L55.4492 63.5795C55.7486 64.5008 54.6941 65.2669 53.9104 64.6975L34.6522 50.7057C34.3018 50.451 33.8272 50.451 33.4767 50.7057L14.2185 64.6975C13.4348 65.2669 12.3803 64.5008 12.6797 63.5795L20.0356 40.9402C20.1695 40.5282 20.0228 40.0768 19.6724 39.8222L0.414202 25.8303C-0.369512 25.2609 0.0332651 24.0213 1.00199 24.0213H24.8064C25.2396 24.0213 25.6236 23.7423 25.7574 23.3303L33.1134 0.690965Z"
            fill="#9C9CA1"
          />
        </svg>
      );
    }
  }

  function ratingByUser(rate: number, prop: any) {
    if (prop.rating >= rate && prop.rating != null) {
      return (
        <svg
          width="69"
          height="65"
          viewBox="0 0 69 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.1134 0.690965C33.4128 -0.230345 34.7162 -0.230344 35.0155 0.690967L42.3715 23.3303C42.5053 23.7423 42.8893 24.0213 43.3225 24.0213H67.1269C68.0956 24.0213 68.4984 25.2609 67.7147 25.8303L48.4566 39.8222C48.1061 40.0768 47.9594 40.5282 48.0933 40.9402L55.4492 63.5795C55.7486 64.5008 54.6941 65.2669 53.9104 64.6975L34.6522 50.7057C34.3018 50.451 33.8272 50.451 33.4767 50.7057L14.2185 64.6975C13.4348 65.2669 12.3803 64.5008 12.6797 63.5795L20.0356 40.9402C20.1695 40.5282 20.0228 40.0768 19.6724 39.8222L0.414202 25.8303C-0.369512 25.2609 0.0332651 24.0213 1.00199 24.0213H24.8064C25.2396 24.0213 25.6236 23.7423 25.7574 23.3303L33.1134 0.690965Z"
            fill="#14AE5C"
          />
        </svg>
      );
    } else {
      return (
        <svg
          width="69"
          height="65"
          viewBox="0 0 69 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.1134 0.690965C33.4128 -0.230345 34.7162 -0.230344 35.0155 0.690967L42.3715 23.3303C42.5053 23.7423 42.8893 24.0213 43.3225 24.0213H67.1269C68.0956 24.0213 68.4984 25.2609 67.7147 25.8303L48.4566 39.8222C48.1061 40.0768 47.9594 40.5282 48.0933 40.9402L55.4492 63.5795C55.7486 64.5008 54.6941 65.2669 53.9104 64.6975L34.6522 50.7057C34.3018 50.451 33.8272 50.451 33.4767 50.7057L14.2185 64.6975C13.4348 65.2669 12.3803 64.5008 12.6797 63.5795L20.0356 40.9402C20.1695 40.5282 20.0228 40.0768 19.6724 39.8222L0.414202 25.8303C-0.369512 25.2609 0.0332651 24.0213 1.00199 24.0213H24.8064C25.2396 24.0213 25.6236 23.7423 25.7574 23.3303L33.1134 0.690965Z"
            fill="#9C9CA1"
          />
        </svg>
      );
    }
  }

  return (
    <>
      <Header />
      <main className="main-individual-page">
        <div className="imageFilm-individual-page">
          <img src={filme.bannerImageUrl ?? undefined} />
        </div>
        <div className="title-icons-individual-page">
          <div>
            <h1 className="title-individual-page">{filme.title}</h1>
          </div>
          <div className="icons-individual-page">
            <button
              className="icon-individual-page"
              type="button"
              onClick={handleFavorito}
              disabled={
                adicionarFavorito.isPending || removerFavorito.isPending
              }
            >
              {filme.isFavorite ? (
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
              ) : (
                <svg
                  width="68"
                  height="61"
                  viewBox="0 0 68 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_167_495)">
                    <path
                      d="M66 19.0018C66 9.61195 58.2804 2 48.758 2C42.4889 2 37.0177 5.31024 33.9999 10.244C30.982 5.31024 25.511 2 19.2418 2C9.71943 2 2 9.61195 2 19.0018C2 21.1483 2.42038 23.1935 3.15638 25.0847C8.85762 41.2552 34.0001 59 34.0001 59C34.0001 59 59.1424 41.2552 64.8438 25.0847C65.5798 23.1937 66 21.1483 66 19.0018Z"
                      stroke="black"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_167_495">
                      <rect width="68" height="61" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </button>
            <button
              className="icon-individual-page"
              type="button"
              onClick={handleAssistido}
              disabled={
                adicionarAssistido.isPending || removerAssistido.isPending
              }
            >
              {filme.isWatched ? (
                <svg
                  width="74"
                  height="51"
                  viewBox="0 0 74 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.2505 11.7132C29.6009 11.7132 23.3967 17.9319 23.3967 25.5995C23.3967 33.2671 29.6009 39.4859 37.2505 39.4859C44.9001 39.4859 51.1043 33.2694 51.1043 25.5995C51.1043 17.9296 44.9024 11.7132 37.2505 11.7132ZM37.2505 34.8571C32.1569 34.8571 27.9085 30.6032 27.9085 25.4977C27.9085 20.3921 32.0507 16.2401 37.1443 16.2401C42.2379 16.2401 46.3802 20.3921 46.3802 25.4977C46.3802 30.6032 42.3441 34.8571 37.2505 34.8571ZM73.9215 24.9607C73.8938 24.845 73.9076 24.7201 73.873 24.6066C73.8592 24.558 73.8268 24.5303 73.8107 24.4886C73.7853 24.4238 73.7922 24.3451 73.7576 24.2826C67.0408 8.86876 52.5682 0 37.1443 0C21.7204 0 6.95691 8.85488 0.237823 24.2687C0.210116 24.3335 0.214734 24.4007 0.189335 24.4747C0.173172 24.521 0.140847 24.5442 0.124684 24.5881C0.0900496 24.7038 0.103903 24.8265 0.0808138 24.9445C0.0392524 25.1528 0 25.3565 0 25.5671C0 25.7777 0.0392524 25.9768 0.0808138 26.1874C0.103903 26.3031 0.0877406 26.4304 0.124684 26.5392C0.138538 26.5924 0.173172 26.6132 0.189335 26.6595C0.212425 26.722 0.207807 26.8007 0.237823 26.8655C6.95691 42.2747 21.5773 51 37.0012 51C52.425 51 67.0431 42.2932 73.7599 26.8794C73.7945 26.8123 73.7876 26.7451 73.813 26.6711C73.8291 26.6317 73.8592 26.6017 73.873 26.5554C73.9076 26.442 73.8984 26.3193 73.9215 26.1989C73.9631 25.9907 74 25.7893 74 25.5741C74 25.3704 73.9608 25.169 73.9192 24.9584L73.9215 24.9607ZM37.0012 46.3712C23.9209 46.3712 11.0438 39.4604 4.71721 25.5648C10.9837 11.7178 24.0317 4.62647 37.1443 4.62647C50.2546 4.62647 63.0116 11.7247 69.2805 25.5787C63.0163 39.4234 50.1161 46.3712 37.0012 46.3712Z"
                    fill="green"
                  />
                </svg>
              ) : (
                <svg
                  width="74"
                  height="51"
                  viewBox="0 0 74 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.2505 11.7132C29.6009 11.7132 23.3967 17.9319 23.3967 25.5995C23.3967 33.2671 29.6009 39.4859 37.2505 39.4859C44.9001 39.4859 51.1043 33.2694 51.1043 25.5995C51.1043 17.9296 44.9024 11.7132 37.2505 11.7132ZM37.2505 34.8571C32.1569 34.8571 27.9085 30.6032 27.9085 25.4977C27.9085 20.3921 32.0507 16.2401 37.1443 16.2401C42.2379 16.2401 46.3802 20.3921 46.3802 25.4977C46.3802 30.6032 42.3441 34.8571 37.2505 34.8571ZM73.9215 24.9607C73.8938 24.845 73.9076 24.7201 73.873 24.6066C73.8592 24.558 73.8268 24.5303 73.8107 24.4886C73.7853 24.4238 73.7922 24.3451 73.7576 24.2826C67.0408 8.86876 52.5682 0 37.1443 0C21.7204 0 6.95691 8.85488 0.237823 24.2687C0.210116 24.3335 0.214734 24.4007 0.189335 24.4747C0.173172 24.521 0.140847 24.5442 0.124684 24.5881C0.0900496 24.7038 0.103903 24.8265 0.0808138 24.9445C0.0392524 25.1528 0 25.3565 0 25.5671C0 25.7777 0.0392524 25.9768 0.0808138 26.1874C0.103903 26.3031 0.0877406 26.4304 0.124684 26.5392C0.138538 26.5924 0.173172 26.6132 0.189335 26.6595C0.212425 26.722 0.207807 26.8007 0.237823 26.8655C6.95691 42.2747 21.5773 51 37.0012 51C52.425 51 67.0431 42.2932 73.7599 26.8794C73.7945 26.8123 73.7876 26.7451 73.813 26.6711C73.8291 26.6317 73.8592 26.6017 73.873 26.5554C73.9076 26.442 73.8984 26.3193 73.9215 26.1989C73.9631 25.9907 74 25.7893 74 25.5741C74 25.3704 73.9608 25.169 73.9192 24.9584L73.9215 24.9607ZM37.0012 46.3712C23.9209 46.3712 11.0438 39.4604 4.71721 25.5648C10.9837 11.7178 24.0317 4.62647 37.1443 4.62647C50.2546 4.62647 63.0116 11.7247 69.2805 25.5787C63.0163 39.4234 50.1161 46.3712 37.0012 46.3712Z"
                    fill="black"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="infos-individual-page">
          <ul className="year-duration-sinopse">
            <li className="year-individual-page">Ano: {filme.releaseYear}</li>
            <li className="duration-individual-page">
              Duração: {Math.trunc(filme.durationMinutes / 60)}h{" "}
              {filme.durationMinutes % 60} min
            </li>
            <li className="age-individual-page">
              <div className={classeRating}>{filme.ageRating}</div>
              <div className="warning-rate">{filme.contentWarning}</div>
            </li>
            <li className="sinopse-individual-page">{filme.synopsis}</li>
          </ul>
          <div className="cast-genres">
            <div className="casting">Elenco: {filme.cast}</div>
            <div className="genres-list">
              <p className="genre-span">Gêneros: </p>{" "}
              {filme.genres.map((genero) => (
                <p className="genre-individual-page" key={genero.id}>
                  {" "}
                  {genero.name},
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="ratings-individual-page">
          <div className="icon-rating-individual-page">
            <div className="icons-rating-individual-page">
              {ratingByUsers(1, filme)}
              {ratingByUsers(2, filme)}
              {ratingByUsers(3, filme)}
              {ratingByUsers(4, filme)}
              {ratingByUsers(5, filme)}
            </div>
            <div className="rating-individual-page">{filme.avgRating}</div>
          </div>
          <div className="rating-numbers-individual-page">
            {filme.reviewCount}{" "}
            {filme.reviewCount == 1 ? "Avaliação" : "Avaliações"}
          </div>
          <button
            className="reviewButton-individual-page"
            onClick={() => setModalAberto(!modalAberto)}
          >
            Criar uma review
          </button>
        </div>
        {modalAberto && (
          <ModalReview
            movieId={Number(id)}
            fecharModal={() => setModalAberto(false)}
          />
        )}
        <div className="users-rating-individual-page">
          <h1 className="title-reviews-individual-page">Reviews</h1>
          <ul className="reviews-individual-page">
            {reviews?.map((review) => (
              <li key={review.id} className="review-individual-page">
                <div className="user-rating-individual-page">
                  <div className="user-name-individual-page">
                    <img src={review.user.avatarUrl} alt="imagem default"></img>
                    <p>{review.user.fullName}</p>
                  </div>
                  <div className="icons-rating-user-individual-page">
                    {ratingByUser(1, review)}
                    {ratingByUser(2, review)}
                    {ratingByUser(3, review)}
                    {ratingByUser(4, review)}
                    {ratingByUser(5, review)}
                  </div>
                </div>
                <div className="user-synopsis">{review.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
