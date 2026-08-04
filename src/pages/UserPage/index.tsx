import { Link } from "react-router-dom";

import "./user.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CarrosselFilmes from "../../components/CarrosselFIlmes";
import { usePerfil } from "../../hooks/usePerfil";
import { useFavoritos } from "../../hooks/useFavoritos";
import { useAssistidos } from "../../hooks/useAssistidos";
import { useMinhasReviews } from "../../hooks/useMinhasReviews";

export default function UserPage() {
  const { data: user } = usePerfil();
  const { data: favoritos } = useFavoritos("");
  const { data: assistidos } = useAssistidos("");
  const { data: reviews } = useMinhasReviews();

  function ratingByUsers(rate: number, prop: any) {
    if (prop.rating >= rate && prop.rating != null) {
      return (
        <svg
          width="46"
          height="44"
          viewBox="0 0 46 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.8252 0L28.2135 16.5836H45.6506L31.5437 26.8328L36.932 43.4164L22.8252 33.1672L8.71835 43.4164L14.1067 26.8328L-0.000160217 16.5836H17.4369L22.8252 0Z"
            fill="#14AE5C"
          />
        </svg>
      );
    } else {
      return (
        <svg
          width="46"
          height="44"
          viewBox="0 0 46 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.7383 16.7383L27.8506 17.084H44.1104L31.25 26.4287L30.9561 26.6416L31.0684 26.9873L35.9795 42.1064L23.1191 32.7627L22.8252 32.5488L22.5312 32.7627L9.66992 42.1064L14.582 26.9873L14.6943 26.6416L14.4004 26.4287L1.54004 17.084H17.7998L17.9121 16.7383L22.8252 1.61719L27.7383 16.7383Z"
            fill="white"
            stroke="#14AE5C"
          />
        </svg>
      );
    }
  }

  return (
    <>
      <Header />

      <main className="user-page">
        <section className="user-profile">
          <div className="user-profile-avatar">
            <img
              className="user-image"
              src={user?.avatarUrl ?? undefined}
              alt="User Photo"
            ></img>
            <h1 className="user-name">{user?.fullName}</h1>
          </div>
        </section>

        <div className="carrossel-container">
          <h2 className="title-carrossel">Favoritos</h2>
          <p className="border-lower">a</p>
          <CarrosselFilmes filmes={favoritos?.data ?? []} />
        </div>

        <div className="carrossel-container">
          <h2 className="title-carrossel">Assistidos</h2>
          <p className="border-lower">a</p>
          <CarrosselFilmes filmes={assistidos?.data ?? []} />
        </div>

        <section className="user-reviews">
          <div className="user-reviews-header">
            <h2 className="user-title-review">Reviews</h2>
          </div>

          <div className="user-reviews-list">
            {reviews?.map((review) => (
              <div key={review.id} className="user-review-card">
                <Link
                  className="user-review-link"
                  to={`/movies/${review.movie.id}`}
                >
                  <img
                    className="user-review-image"
                    src={review.movie.posterImageUrl ?? undefined}
                    alt={review.movie.title}
                  />
                </Link>

                <div className="user-review-content">
                  <div className="user-review-title">
                    <p className="title-user-review-page">
                      {review.movie.title}
                    </p>

                    <p className="year-user-review-page">
                      {review.movie.releaseYear}
                    </p>
                    <div className="rating-starts-user">
                      {ratingByUsers(1, review)}
                      {ratingByUsers(2, review)}
                      {ratingByUsers(3, review)}
                      {ratingByUsers(4, review)}
                      {ratingByUsers(5, review)}
                    </div>
                  </div>

                  <p className="user-review-text">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
