import { useEffect, useState } from "react";
import styles from "./reviews.module.css";
import { serverPath } from "../../services/settings";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch(`${serverPath}/reviews`);
        const result = await response.json();
        setReviews(result.data); // Gem anmeldelserne i state
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getReviews(); // Kald funktionen for at hente anmeldelserne
  }, []);

  return (
    <div className={styles.reviews}>
      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <div key={review._id} className={styles.review}>
            <p className={styles.reviewName}>
              {review.name}, {review.age} år
            </p>

            <p className={styles.beforeStay}>
              Har været på <p className={styles.reviewStay}>{review.stay}</p>
            </p>

            <p className={styles.reviewText}>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
