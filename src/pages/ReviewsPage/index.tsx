import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useMinhasReviews } from "../../hooks";
import "./review.css";
import { useState } from "react";
import { useExcluirReview } from "../../hooks";
import type { filmeReview } from "../../types/filmes";
import ModalEditarReview from "../../components/ModalEditarReview";

export default function ReviewsPage() {
  const [reviewExcluir, setReviewExcluir] = useState<filmeReview | null>(null);
  const [reviewEditar, setReviewEditar] = useState<filmeReview | null>(null);
  const excluirMutation = useExcluirReview();

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

  const { data: reviews, isLoading, isError } = useMinhasReviews();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar suas reviews.</p>;
  }

  return (
    <>
      <Header />

      <h1 className="title-user-review">Minhas Avaliações</h1>

      <div className="list-user-review">
        {reviews?.map((review) => (
          <div key={review.id} className="container-user-review">
            <Link
              className="link-user-review"
              to={`/movies/${review.movie.id}`}
            >
              <img
                className="image-user-review"
                src={review.movie.posterImageUrl ?? undefined}
                alt={review.movie.title}
              />
            </Link>

            <div className="textContent-user-review">
              <div className="upperContent-user-review">
                <div className="textRating-user-review">
                  <p>{review.movie.title}</p>

                  <p>{review.movie.releaseYear}</p>

                  <div className="ratingStars-user-review">
                    {ratingByUser(review.rating, 1)}
                    {ratingByUser(review.rating, 2)}
                    {ratingByUser(review.rating, 3)}
                    {ratingByUser(review.rating, 4)}
                    {ratingByUser(review.rating, 5)}
                  </div>
                </div>

                <div className="buttons-user-review">
                  <button onClick={() => setReviewEditar(review)}>
                    <svg
                      width="33"
                      height="38"
                      viewBox="0 0 33 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.1061 8.90131C18.7279 8.12558 18.6031 6.99276 17.8272 6.37104C17.0515 5.74934 15.9187 5.87417 15.2971 6.64989L18.1061 8.90131ZM2.5464 25.4373L3.90967 26.6126C3.92374 26.5962 3.93749 26.5797 3.95095 26.5629L2.5464 25.4373ZM2.136 26.4405L0.339505 26.3231L0.337921 26.3572L2.136 26.4405ZM1.8 33.6957L0.00192171 33.6124C-0.00220629 33.7017 0.000313708 33.7912 0.00950571 33.8802L1.8 33.6957ZM3.6888 35.3445L3.74765 37.1435C3.8677 37.1394 3.98703 37.1236 4.10391 37.0958L3.6888 35.3445ZM10.8888 33.6381L11.304 35.3896L11.3318 35.3826L10.8888 33.6381ZM11.8128 33.0525L13.2014 34.198L13.217 34.1786L11.8128 33.0525ZM27.713 16.1018C28.3349 15.3261 28.2103 14.1933 27.4349 13.5714C26.6594 12.9494 25.5264 13.074 24.9046 13.8496L27.713 16.1018ZM15.3046 6.64941C14.6827 7.42493 14.807 8.5578 15.5827 9.17978C16.3582 9.80174 17.491 9.67728 18.113 8.90179L15.3046 6.64941ZM20.52 3.02359L21.9242 4.14979C21.9478 4.12029 21.9706 4.09005 21.9924 4.05912L20.52 3.02359ZM24.4296 2.25559L25.5811 0.872134C25.5238 0.824422 25.4635 0.780334 25.4009 0.740086L24.4296 2.25559ZM29.7984 6.72439L31.0723 5.45277C31.0332 5.41363 30.9924 5.37633 30.9499 5.34093L29.7984 6.72439ZM29.7768 10.6556L28.5168 9.37006C28.4659 9.42007 28.4179 9.47306 28.373 9.52877L29.7768 10.6556ZM24.9046 13.8496C24.2822 14.6248 24.4068 15.7569 25.182 16.3792C25.9572 17.0015 27.0907 16.877 27.713 16.1018L24.9046 13.8496ZM18.4889 7.50885C18.3415 6.52572 17.4252 5.84815 16.4422 5.99549C15.4589 6.1428 14.7814 7.05921 14.9287 8.04235L18.4889 7.50885ZM26.5512 16.7591C27.5362 16.6254 28.2262 15.7182 28.0925 14.7333C27.9586 13.7482 27.0516 13.0581 26.0664 13.192L26.5512 16.7591ZM15.2971 6.64989L1.14185 24.3114L3.95095 26.5629L18.1061 8.90131L15.2971 6.64989ZM1.18313 24.2618C0.685465 24.839 0.389113 25.5626 0.339505 26.3231L3.93219 26.5576C3.93087 26.5778 3.92297 26.5972 3.90967 26.6126L1.18313 24.2618ZM0.337921 26.3572L0.00192171 33.6124L3.59808 33.779L3.93408 26.5238L0.337921 26.3572ZM0.00950571 33.8802C0.205514 35.7808 1.83811 37.2059 3.74765 37.1435L3.62995 33.5454C3.62227 33.5457 3.61851 33.5445 3.61606 33.5435C3.61263 33.5423 3.60809 33.5399 3.60346 33.5358C3.5988 33.5318 3.5958 33.5277 3.5941 33.5246C3.59287 33.5222 3.59129 33.5186 3.5905 33.5109L0.00950571 33.8802ZM4.10391 37.0958L11.304 35.3896L10.4736 31.8866L3.2737 33.593L4.10391 37.0958ZM11.3318 35.3826C12.065 35.1964 12.72 34.7817 13.2014 34.198L10.4242 31.907C10.4299 31.9002 10.4374 31.8954 10.4458 31.8933L11.3318 35.3826ZM13.217 34.1786L27.713 16.1018L24.9046 13.8496L10.4086 31.9264L13.217 34.1786ZM18.113 8.90179L21.9242 4.14979L19.1158 1.89741L15.3046 6.64941L18.113 8.90179ZM21.9924 4.05912C22.325 3.58603 22.9714 3.45905 23.4583 3.77112L25.4009 0.740086C23.2906 -0.612218 20.4895 -0.0619942 19.0476 1.98809L21.9924 4.05912ZM23.2781 3.63905L28.6469 8.10785L30.9499 5.34093L25.5811 0.872134L23.2781 3.63905ZM28.5245 7.99603C28.7066 8.17865 28.8084 8.42657 28.807 8.68461L32.407 8.70439C32.4137 7.48589 31.9332 6.31521 31.0723 5.45277L28.5245 7.99603ZM28.807 8.68461C28.8058 8.94266 28.7011 9.18943 28.5168 9.37006L31.0368 11.9412C31.907 11.0882 32.4002 9.92289 32.407 8.70439L28.807 8.68461ZM28.373 9.52877L24.9046 13.8496L27.713 16.1018L31.1806 11.7824L28.373 9.52877ZM14.9287 8.04235C15.767 13.6375 20.945 17.5209 26.5512 16.7591L26.0664 13.192C22.4114 13.6886 19.0356 11.1567 18.4889 7.50885L14.9287 8.04235Z"
                        fill="black"
                      />
                    </svg>
                  </button>

                  <button onClick={() => setReviewExcluir(review)}>
                    <svg
                      width="45"
                      height="50"
                      viewBox="0 0 45 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 25.0007L27.5 35.0007M27.5 25.0007L17.5 35.0007M2.5 10.0007H42.5M32.5 10.0007L31.8235 7.97088C31.1677 6.00383 30.8398 5.0203 30.2318 4.29315C29.6948 3.65103 29.0052 3.154 28.2262 2.84765C27.344 2.5007 26.3075 2.5007 24.234 2.5007H20.766C18.6925 2.5007 17.656 2.5007 16.7738 2.84765C15.9948 3.154 15.3052 3.65103 14.7682 4.29315C14.1601 5.0203 13.8323 6.00383 13.1766 7.97088L12.5 10.0007M37.5 10.0007V35.5007C37.5 39.7012 37.5 41.8012 36.6825 43.4057C35.9635 44.817 34.8162 45.9642 33.405 46.6832C31.8005 47.5007 29.7005 47.5007 25.5 47.5007H19.5C15.2996 47.5007 13.1994 47.5007 11.5951 46.6832C10.1839 45.9642 9.0365 44.817 8.31745 43.4057C7.5 41.8012 7.5 39.7012 7.5 35.5007V10.0007"
                        stroke="#EF2027"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="lowerContent-user-review">
                <p>{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {reviewExcluir && (
        <div className="modal-excluir-overlay">
          <div className="modal-excluir-container">
            <svg
              onClick={() => setReviewExcluir(null)}
              className="icon-modal-excluir"
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

            <p className="textContent-modal-excluir">
              Deseja apagar essa avaliação? Esta ação é{" "}
              <strong className="strong-modal-excluir">irreversível!</strong>
            </p>

            <div className="modal-excluir-buttons">
              <button
                className="cancelar-button-modal-excluir"
                onClick={() => setReviewExcluir(null)}
              >
                Cancelar
              </button>

              <button
                className="apagar-button-modal-excluir"
                onClick={() => {
                  if (reviewExcluir) {
                    excluirMutation.mutate(reviewExcluir.id, {
                      onSuccess: () => {
                        setReviewExcluir(null);
                      },
                    });
                  }
                }}
              >
                Apagar Avaliação
              </button>
            </div>
          </div>
        </div>
      )}
      {reviewEditar && (
        <ModalEditarReview
          review={reviewEditar}
          fecharModal={() => setReviewEditar(null)}
        />
      )}
      <Footer />
    </>
  );
}
