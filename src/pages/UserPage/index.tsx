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

  return (
    <>
      <Header />

      <main className="user-page">
        <section className="user-profile">
          <div className="user-profile-avatar">
            <img
              className="user-image"
              src={user?.avatarUrl}
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
                <Link to={`/movies/${review.movie.id}`}>
                  <img
                    className="user-review-poster"
                    src={review.movie.posterImageUrl ?? undefined}
                    alt={review.movie.title}
                  />
                </Link>

                <div className="user-review-content">
                  <div className="user-review-title">
                    <h3>{review.movie.title}</h3>

                    <span>{review.movie.releaseYear}</span>
                  </div>

                  <p className="user-review-rating">Nota: {review.rating}/5</p>

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
