import Header from "../../components/header";
import Footer from "../../components/footer";
import "./homePage.css";
import { listarReviewsTotal } from "../../services/filmes";
import type { filmeReview } from "../../types/filmes";
import CarrosselCategoria from "../../components/CarrosselCategoria";
import HeroCarrossel from "../../components/HeroCarrossel";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [reviews, setReviews] = useState<filmeReview[]>([]);

  function ratingByUser(rate: number, extimate: any) {
    if (extimate <= rate && extimate != null) {
      return (
        <svg
          width="46"
          height="44"
          viewBox="0 0 46 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.8254 0L28.2138 16.5836H45.6508L31.5439 26.8328L36.9323 43.4164L22.8254 33.1672L8.71859 43.4164L14.1069 26.8328L8.39233e-05 16.5836H17.4371L22.8254 0Z"
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
            d="M27.7385 16.7383L27.8508 17.084H44.1106L31.2502 26.4287L30.9563 26.6416L31.0686 26.9873L35.9797 42.1064L23.1194 32.7627L22.8254 32.5488L22.5315 32.7627L9.67017 42.1064L14.5823 26.9873L14.6946 26.6416L14.4006 26.4287L1.54028 17.084H17.8L17.9124 16.7383L22.8254 1.61719L27.7385 16.7383Z"
            fill="white"
            stroke="#14AE5C"
          />
        </svg>
      );
    }
  }

  useEffect(() => {
    async function carregarReviews() {
      const data = await listarReviewsTotal();
      setReviews(data);
    }

    carregarReviews();
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroCarrossel />
        <CarrosselCategoria generoId={1} titulo="Ação" />

        <CarrosselCategoria generoId={2} titulo="Aventura" />

        <CarrosselCategoria generoId={3} titulo="Comédia" />
        <h3 className="review-home-titleSection">Reviews</h3>
        <ul className="reviews-list-home">
          {reviews.map((review) => (
            <li key={review.id} className="reviews-container-home">
              <img
                className="review-home-image"
                src={review.movie.posterImageUrl ?? undefined}
                alt={review.movie.title + "Foto"}
              ></img>
              <div className="review-home-textContent">
                <div className="review-home-title-rating">
                  <p className="review-home-moviewTitle">
                    {review.movie.title}
                  </p>
                  <p className="review-home-year">{review.movie.releaseYear}</p>
                  <div className="review-home-starRating">
                    {ratingByUser(review.rating, 1)}
                    {ratingByUser(review.rating, 2)}
                    {ratingByUser(review.rating, 3)}
                    {ratingByUser(review.rating, 4)}
                    {ratingByUser(review.rating, 5)}
                  </div>
                </div>
                <div className="review-home-userInfo">
                  <img
                    className="review-home-userPhoto"
                    src={review.user.avatarUrl}
                    alt="user-foto"
                  ></img>
                  <p className="review-home-username">{review.user.fullName}</p>
                </div>
                <div className="review-home-comment">{review.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
